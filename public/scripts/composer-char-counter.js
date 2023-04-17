$(document).ready(function() {
  $("#tweetText").on("keyup", function() {
    const maxChar = 140;
    //counts characters from keyup
    const currentCount = $(this).val().length;
    const remainingCharCount = maxChar - currentCount;
    const counter = $(this).parent().find(".counter");
    counter.text(remainingCharCount);
    if (remainingCharCount < 0) {
      counter.css("color", "red");
    }
  });
});