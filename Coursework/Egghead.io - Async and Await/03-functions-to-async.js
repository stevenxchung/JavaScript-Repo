// Async with promise
// const fetch = require('node-fetch');

// const showGitHubUser = async handle => {
//   const url = `https://api.github.com/users/${handle}`;
//   const response = await fetch(url);
//   return await response.json();
// };

// showGitHubUser('stevenxchung').then(user => {
//   console.log(user.name);
//   console.log(user.location);
// });

// Convert function to async
const fetch = require('node-fetch');

class GitHubApiClient {
  async fetchUser(handle) {
    const url = `https://api.github.com/users/${handle}`;
    const response = await fetch(url);
    return await response.json();
  }
}

(async () => {
  const client = new GitHubApiClient();
  const user = await client.fetchUser('stevenxchung');
  console.log(user.name);
  console.log(user.location);
})();
