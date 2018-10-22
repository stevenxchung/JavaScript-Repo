// Sequential http requests
// const fetch = require('node-fetch');

// async function fetchFromGitHub(handle) {
//   const url = `https://api.github.com/users/${handle}`;
//   const response = await fetch(url);
//   return await response.json();
// }

// async function showUserAndRepos(handle) {
//   const user = await fetchFromGitHub(`/users/${handle}`);
//   const repos = await fetchFromGitHub(`/users/${handle}/repos`);

//   console.log(user.name);
//   console.log(`${repos.length} repos`);
// }

// showUserAndRepos('stevenxchung');

// Async with multiple promises
const fetch = require('node-fetch');

async function fetchFromGitHub(handle) {
  const url = `https://api.github.com/users/${handle}`;
  const response = await fetch(url);
  return await response.json();
}

async function showUserAndRepos(handle) {
  const userPromise = fetchFromGitHub(`/users/${handle}`);
  const reposPromise = fetchFromGitHub(`/users/${handle}/repos`);

  const user = await userPromise;
  const repos = await reposPromise;

  console.log(user.name);
  console.log(`${repos.length} repos`);
}

showUserAndRepos('stevenxchung');
