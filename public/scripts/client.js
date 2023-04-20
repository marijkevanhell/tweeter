$(document).ready(function() {
//tweet template
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
              <span class="tweetDate">${timeago.format(tweetData.created_at)}</span>
              <div class="tweetReactions">
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>
            </footer>
          </article>`)
  return $tweet;
  }

//creates tweet box area
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweetsContainer').append($tweet);
  }
};

//adds newly created tweet
const submitNewTweet = function (textarea) {
  const config = {
    method: "POST",
    url: "/tweets",
    data: textarea.serialize(),
    success: (tweet) => {
      console.log("Successfully submitted tweet!", tweet);
      $("#tweetsContainer").empty()
      loadTweets();
      textarea.val("");
    },
    error: (error) => {
      console.log("Error", error);
    },
  };
  $.ajax(config)
};

$("form").submit((event) => {
  event.preventDefault();
  const maxCharLength = 140;
    const inputLength = $(this).find("#tweetText").val().length;
    if (!inputLength) {
      return alert("Blank tweet, please add text");
    } else if (inputLength - maxCharLength > 0) {
      return alert("Max 140 characters, please remove characters!");
    } else {
      const newTweet = $(this).serialize();
      $.post("/tweets/", newTweet);
    }
    submitNewTweet ($("#tweetText"));
});

//displays tweets on page
const loadTweets = () => {
  const config = {
    method: "GET",
    url: "/tweets",
    success: (tweets) => {
      console.log("Successfully got tweets!", tweets);
      renderTweets(tweets);
    },
    error: (error) => {
      console.log("Error", error);
    },
  };
  $.ajax(config)
};
loadTweets();
});