// Starting point
const fetch = require('node-fetch');

async function fetchFromGitHub(handle) {
  const url = `https://api.github.com/users/${handle}`;
  const response = await fetch(url);
  return await response.json();
}

async function showUserAndRepos(handle) {
  const user = await fetchFromGitHub(`/users/${handle}`);
  const repos = await fetchFromGitHub(`/users/${handle}/repos`)

  console.log(user.name);
  console.log(`${repos.length} repos`);
}

showUserAndRepos('stevenxchung');
