// Example 1
const cardholdersList = [
  {
    accountNumber: 'BANK-001',
    name: 'First',
    id: '001',
    otherData: 'Other Data...'
  },
  {
    accountNumber: 'BANK-002',
    name: 'Second',
    id: '002',
    otherData: 'Other Data...'
  },
  {
    accountNumber: 'BANK-003',
    name: 'Third',
    id: '003',
    otherData: 'Other Data...'
  }
];

// We are trying to establish a new state
const masterAccountState = {
  masterAccounts: [
    {
      masterAccountId: 'Some string',
      cardholderIds: [] // Make a function to grab these from cardholdersList
    }
  ]
};

// Returns a mapping of object ids back as an array
let cardholderIds = cardholdersList.map(obj => obj.id);
console.log(cardholderIds);

// Returns a mapping of filtered object ids
let filteredCardholderIds = cardholdersList
  .map(obj => obj.id)
  .filter(str => str == '003');
console.log(filteredCardholderIds);

// Example 2
const accounts = [
  {
    accountId: '001',
    type: 'Admin',
    otherProperties: 'Other Properties...'
  },
  {
    accountId: '002',
    type: 'Admin',
    otherProperties: 'Other Properties...'
  },
  {
    accountId: '003',
    type: 'Admin',
    otherProperties: 'Other Properties...'
  }
];

// Let's get it to look like this:
// accounts = {
//   '001': {
//     accountId: '001',
//     type: 'Admin',
//     otherProperties: 'Other Properties...'
//   },
//   '002': {
//     accountId: '001',
//     type: 'Admin',
//     otherProperties: 'Other Properties...'
//   }
// };

let newAccounts = accounts.reduce((accounts, account) => {
  console.log({
    ...accounts,
    [account.accountId]: account
  });
  return {
    ...accounts,
    [account.accountId]: account
  };
}, {});
