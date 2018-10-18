// Initial async
// const fetch = require('node-fetch');

// const showGitHubUser = async handle => {
//   const url = `https://api.github.com/users/${handle}`;
//   const response = await fetch(url);
//   const user = await response.json();
//   console.log(user.name);
//   console.log(user.location);
// };

// showGitHubUser('stevenxchung');

// Async with promise
const fetch = require('node-fetch');

const showGitHubUser = async handle => {
  const url = `https://api.github.com/users/${handle}`;
  const response = await fetch(url);
  return await response.json();
};

showGitHubUser('stevenxchung').then(user => {
  console.log(user.name);
  console.log(user.location);
});
