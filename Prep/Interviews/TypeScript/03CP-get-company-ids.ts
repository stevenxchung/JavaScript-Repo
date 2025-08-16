// =========== Type Definitions ===========

type User = { userId: number; tenantId: number };

// =========== Event System ===============

type EventMap = {
  userEvent: [userId: number, tenantId: number];
  companyOfInterestAdded: [tenantId: number, companyId: number];
  companyOfInterestRemoved: [tenantId: number, companyId: number];
  targetAccountAdded: [userId: number, companyId: number];
  targetAccountRemoved: [userId: number, companyId: number];
  userFilterUpdated: [userId: number, filter: string];
  companyFilterUpdated: [companyId: number, filter: string];
  companyScoreUpdated: [tenantId: number, companyId: number, score: number];
  testEvent: [someString: string, someNumber: number];
};

class EventEmitter<EM extends Record<string, any[]>> {
  private listeners: { [K in keyof EM]?: ((...args: EM[K]) => void)[] } = {};

  addListener<K extends keyof EM>(
    event: K,
    callback: (...args: EM[K]) => void
  ) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]!.push(callback);
  }

  trigger<K extends keyof EM>(event: K, ...args: EM[K]) {
    for (const cb of this.listeners[event] || []) {
      cb(...args);
    }
  }
}

const eventEmitter = new EventEmitter<EventMap>();

// =========== In-memory Data Stores ==============

const users: User[] = [
  { userId: 10, tenantId: 100 },
  { userId: 11, tenantId: 100 },
  { userId: 12, tenantId: 200 },
  { userId: 21, tenantId: 200 },
  { userId: 22, tenantId: 200 },
];

// -- Derived, event-driven states
const userMap: Record<number, number> = {}; // userId -> tenantId
const companiesOfInterest: Record<number, Set<number>> = {}; // tenantId -> Set<companyId>
const targetAccounts: Record<number, Set<number>> = {}; // userId -> Set<companyId>
const userFilter: Record<number, string> = {}; // userId => filters
const companyFilter: Record<number, string> = {}; // companyId => filters
const companyScores: Record<string, number> = {}; // key: `${tenantId}_${companyId}` => score

// =========== Event Listeners ===================

eventEmitter.addListener("userEvent", (userId, tenantId) => {
  userMap[userId] = tenantId;
});

eventEmitter.addListener("companyOfInterestAdded", (tenantId, companyId) => {
  (companiesOfInterest[tenantId] ??= new Set()).add(companyId);
});
eventEmitter.addListener("companyOfInterestRemoved", (tenantId, companyId) => {
  companiesOfInterest[tenantId]?.delete(companyId);
});

eventEmitter.addListener("targetAccountAdded", (userId, companyId) => {
  (targetAccounts[userId] ??= new Set()).add(companyId);
});
eventEmitter.addListener("targetAccountRemoved", (userId, companyId) => {
  targetAccounts[userId]?.delete(companyId);
});

eventEmitter.addListener("userFilterUpdated", (userId, filters) => {
  userFilter[userId] = filters;
});

eventEmitter.addListener("companyFilterUpdated", (companyId, filters) => {
  companyFilter[companyId] = filters;
});

eventEmitter.addListener(
  "companyScoreUpdated",
  (tenantId, companyId, score) => {
    companyScores[`${tenantId}_${companyId}`] = score;
  }
);

// =========== Main Logic Function ===================

const getCompaniesInTerritory = (userId: number): number[] => {
  const tenantId = userMap[userId];
  const whitespaceIds = [...companiesOfInterest[tenantId]].filter(
    (companyId) => !targetAccounts[userId].has(companyId)
  );
  const territoryIds = whitespaceIds.filter(
    (companyId) => userFilter[userId] === companyFilter[companyId]
  );
  territoryIds.sort(
    (a, b) =>
      companyScores[`${tenantId}_${b}`] - companyScores[`${tenantId}_${a}`]
  );

  return territoryIds;
};

// =========== Example Usage and Test ==============

function setupUserAndCompanies({
  userId,
  tenantId,
  userFilterValue,
  companies,
  targetAccounts = [],
  companiesOfInterest = [],
}: {
  userId: number;
  tenantId: number;
  userFilterValue: string;
  companies: { companyId: number; filter: string; score: number }[];
  targetAccounts?: number[];
  companiesOfInterest?: number[];
}) {
  eventEmitter.trigger("userEvent", userId, tenantId);
  eventEmitter.trigger("userFilterUpdated", userId, userFilterValue);

  for (const { companyId, filter, score } of companies) {
    eventEmitter.trigger("companyFilterUpdated", companyId, filter);
    eventEmitter.trigger("companyScoreUpdated", tenantId, companyId, score);
  }

  for (const companyId of targetAccounts) {
    eventEmitter.trigger("targetAccountAdded", userId, companyId);
  }

  for (const companyId of companiesOfInterest) {
    eventEmitter.trigger("companyOfInterestAdded", tenantId, companyId);
  }
}

// Setup all users in userMap
for (const { userId, tenantId } of users) {
  eventEmitter.trigger("userEvent", userId, tenantId);
}

// ---- Test Case 1: User 10, tenant 100 ----
setupUserAndCompanies({
  userId: 10,
  tenantId: 100,
  userFilterValue: "TERRITORY:EAST",
  companies: [
    { companyId: 1001, filter: "INDUSTRY:SOFTWARE", score: 50 },
    { companyId: 1002, filter: "TERRITORY:EAST", score: 90 },
    { companyId: 1003, filter: "TERRITORY:WEST", score: 99 },
    { companyId: 1004, filter: "TERRITORY:EAST", score: 60 },
    { companyId: 1005, filter: "TERRITORY:EAST", score: 80 },
    { companyId: 1006, filter: "TERRITORY:WEST", score: 70 },
  ],
  targetAccounts: [1001, 1002],
  companiesOfInterest: [1001, 1002, 1003, 1004, 1005, 1006],
});
// expected: [1005, 1004]
console.log(getCompaniesInTerritory(10)); // [1005, 1004]

// ---- Test Case 2: User 12, tenant 200 ----
setupUserAndCompanies({
  userId: 12,
  tenantId: 200,
  userFilterValue: "TERRITORY:WEST",
  companies: [
    { companyId: 2001, filter: "TERRITORY:WEST", score: 77 },
    { companyId: 2002, filter: "TERRITORY:EAST", score: 88 },
    { companyId: 2003, filter: "TERRITORY:WEST", score: 66 },
    { companyId: 2004, filter: "TERRITORY:EAST", score: 55 },
    { companyId: 2005, filter: "TERRITORY:WEST", score: 99 },
  ],
  targetAccounts: [2002],
  companiesOfInterest: [2001, 2002, 2003, 2004, 2005],
});
// expected: [2005, 2001, 2003]
console.log(getCompaniesInTerritory(12)); // [2005, 2001, 2003]
