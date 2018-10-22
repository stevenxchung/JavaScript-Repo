// Starting point
const fetch = require('node-fetch');

async function fetchFromGitHub(handle) {
  const url = `https://api.github.com/users/${handle}`;
  const response = await fetch(url);
  return await response.json();
}

async function showUserAndRepos(handle) {

}

showUserAndRepos('stevenxchung');
