// Initial async
const fetch = require('node-fetch');

const showGitHubUser = async handle => {
  const url = `https://api.github.com/users/${handle}`;
  const response = await fetch(url);
  const user = await response.json();
  console.log(user.name);
  console.log(user.location);
};

showGitHubUser('stevenxchung');
