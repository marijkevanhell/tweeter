$(document).ready(function() {
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweetsContainer').append($tweet);
  }
};

const createTweetElement = function(tweetData) {
let $tweet = $(`
<article class="tweet">
          <header class="tweetHeader">
            <div class="user">
              <img class="userIcon" src="${tweetData.user.avatars}"></img>  
              <h4 class="name">${tweetData.user.name}</h4>
            </div>
            <div>
              <h4 class="userName">${tweetData.user.handle}</h4>
            </div>
          </header>
          <div class="tweetMsg">
            ${tweetData.content.text}
          </div>
          <footer class="tweetFooter">
            <span class="tweetDate">${tweetData.created_at}</span>
            <div class="tweetReactions">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>`)
return $tweet;
}
renderTweets(data);
});
