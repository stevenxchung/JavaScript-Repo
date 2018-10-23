// Sequential http requests
const fetch = require('node-fetch');

async function fetchFromGitHub(handle) {
  const url = `https://api.github.com/users/${handle}`;
  const response = await fetch(url);
  return await response.json();
}

async function showUserAndRepos(handle) {
  const results = Promise.all([
    fetchFromGitHub(`/users/${handle}`),
    fetchFromGitHub(`/users/${handle}/repos`),
  ])

  const user = results[0];
  const repos = results[1];

  console.log(user.name);
  console.log(`${repos.length} repos`);
}

showUserAndRepos('stevenxchung');
