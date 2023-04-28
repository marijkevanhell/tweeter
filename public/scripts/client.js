//security to re-encode unsafe text
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {

  //hides error msgs
  $("#errorMsgEmpty").hide();
  $("#errorMsgLong").hide();

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
            ${escape(tweetData.content.text)}
            </div>
            <footer class="tweetFooter">
              <span class="tweetDate">${timeago.format(tweetData.created_at)}</span>
              <div class="tweetReactions">
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>
            </footer>
          </article>`);
    return $tweet;
  };

  //creates tweet box area
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweetsContainer').prepend($tweet);
    }
  };

  //adds newly created tweet
  const submitNewTweet = function(textarea) {
    const config = {
      method: "POST",
      url: "/tweets",
      data: textarea.serialize(),
      success: (tweet) => {
        console.log("Successfully submitted tweet!", tweet);
        $("#tweetsContainer").empty();
        loadTweets();
        textarea.val("");
      },
      error: (error) => {
        console.log("Error", error);
      },
    };
    $.ajax(config);
  };

  //submits tweet or error msg when empty or too many char tweet is submitted
  $("form").submit((event) => {
    event.preventDefault();
    const maxCharLength = 140;
    const inputLength = $(this).find("#tweetText").val().length;
    $("#errorMsgEmpty").slideUp("slow");
    $("#errorMsgLong").slideUp("slow");
    if (!inputLength) {
      $("#errorMsgEmpty").slideDown("slow");
      $("#errorMsgLong").hide();
      return;
    }
    if (inputLength - maxCharLength > 0) {
      $("#errorMsgLong").slideDown("slow");
      $("#errorMsgEmpty").hide();
      return;
    }
    const newTweet = $(this).serialize();
    $.post("/tweets/", newTweet);
    submitNewTweet($("#tweetText"));
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
    $.ajax(config);
  };
  loadTweets();
});