const accounts = [
  {
    accountId: '001',
    accountType: 'First',
    roleName: 'Admin'
  },
  {
    accountId: '002',
    accountType: 'First - Alternative',
    roleName: 'Cardholder'
  },
  {
    accountId: '003',
    accountType: 'Second',
    roleName: 'Secondary Admin Role 001'
  },
  {
    accountId: '004',
    accountType: 'Second',
    roleName: 'Secondary Admin Role 002'
  }
];

const productNames = ['Knights', 'Dragons'];

const productIcon = ['K', 'D'];

// export interface Product = {
//     productName: string
//     productIcon: string
//     accounts: Accounts[]
// };

let createProductMap = accounts => {
  const accountsFirst = accounts.filter(account =>
    account.accountType.toLowerCase().includes('first')
  );
  const accountsSecond = accounts.filter(account =>
    account.accountType.toLowerCase().includes('second')
  );

  // console.log({ accountsFirst, accountsSecond });
};

// Testing
console.log(createProductMap(accounts));
