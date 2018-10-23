// Resolves after each promise within promise.all() is resolved
// const fetch = require('node-fetch');

// async function fetchFromGitHub(handle) {
//   const url = `https://api.github.com/users/${handle}`;
//   const response = await fetch(url);
//   return await response.json();
// }

// async function showUserAndRepos(handle) {
//   const results = Promise.all([
//     fetchFromGitHub(`/users/${handle}`),
//     fetchFromGitHub(`/users/${handle}/repos`),
//   ])

//   const user = results[0];
//   const repos = results[1];

//   console.log(user.name);
//   console.log(`${repos.length} repos`);
// }

// showUserAndRepos('stevenxchung');

// Refactor promise.all() using ES6 destructuring syntax
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const fetch = require('node-fetch');

async function fetchFromGitHub(handle) {
  const url = `https://api.github.com/users/${handle}`;
  const response = await fetch(url);
  return await response.json();
}

async function showUserAndRepos(handle) {
  const [user, repos] = Promise.all([
    fetchFromGitHub(`/users/${handle}`),
    fetchFromGitHub(`/users/${handle}/repos`)
  ]);

  console.log(user.name);
  console.log(`${repos.length} repos`);
}

showUserAndRepos('stevenxchung');
