const { performance } = require("perf_hooks");
const Heap = require("./heap");

/*
  ...
*/
class Solution {
  constructor({ k = 10, debug = false }) {
    this.k = k;
    this.time = 0;
    this.tweetMap = {};
    this.followMap = {};

    this.debug = debug;
  }

  /**
   * @param {number} userId
   * @param {number} tweetId
   * @return {void}
   */
  postTweet(userId, tweetId) {
    this.tweetMap[userId]
      ? this.tweetMap[userId].push([this.time, tweetId])
      : (this.tweetMap[userId] = [[this.time, tweetId]]);

    this.time++;

    if (this.debug)
      console.log(`postTweet(${userId}, ${tweetId}):`, this.tweetMap[userId]);
  }

  /**
   * @param {number} userId
   * @return {number[]}
   */
  getNewsFeed(userId) {
    if (!(userId in this.tweetMap)) [];

    // Get all tweets for all followed users
    let newsFeed = [...this.tweetMap[userId]];
    if (userId in this.followMap) {
      for (const followeeId of this.followMap[userId]) {
        if (followeeId in this.tweetMap)
          newsFeed.push(...this.tweetMap[followeeId].slice(-this.k));
      }
    }
    const heap = new Heap((a, b) => b[0] - a[0]);
    heap.setHeap(newsFeed);
    const mostRecentTweets = heap.getTopK(this.k).map((e) => e[1]);

    if (this.debug) console.log(`getNewsFeed(${userId}):`, mostRecentTweets);
    return mostRecentTweets;
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  follow(followerId, followeeId) {
    if (followerId === followeeId) return;

    this.followMap[followerId]
      ? this.followMap[followerId].add(followeeId)
      : (this.followMap[followerId] = new Set([followeeId]));

    if (this.debug)
      console.log(
        `follow(${followerId}, ${followeeId})`,
        this.followMap[followerId]
      );
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  unfollow(followerId, followeeId) {
    if (followerId === followeeId) return;

    if (this.followMap[followerId])
      this.followMap[followerId].delete(followeeId);

    if (this.debug)
      console.log(
        `unfollow(${followerId}, ${followeeId})`,
        this.followMap[followerId]
      );
  }
}

const test = new Solution({ debug: true });
const solStart = performance.now();
// User 1 posts a new tweet(id = 5)
test.postTweet(1, 5);
// User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
test.getNewsFeed(1);
// User 1 follows user 2
test.follow(1, 2);
// User 2 posts a new tweet(id=6)
test.postTweet(2, 6);
// User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5
test.getNewsFeed(1);
// User 1 unfollows user 2
test.unfollow(1, 2);
// User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2
test.getNewsFeed(1);
console.log(`Runtime for solution: ${(performance.now() - solStart) / 1000}`);
