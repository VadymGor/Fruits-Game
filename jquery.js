var playing = false;
var score;
var trialsLeft;
var step;
var action; // used for setInterval
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];

$(function() {
  // click on start/reset button
  $("#startreset").click(function() {
    // we are playing
    if (playing == true) {
      // reload page
      location.reload();
    } else {
      // we are not playing
      playing = true; // game initiated
      score = 0; // set score to 0
      $("#scorevalue").html(score);

      // show trials left
      $("#trialsLeft").show();
      trialsLeft = 3;
      addHearts();

      // hide game over box
      $("#gameover").hide();

      // change button text to "reset game"
      $("#startreset").html("Reset Game");

      // start sending fruits
      startAction();
    }
  });

$("#fruit1").mouseover(function(){
  score ++;
  $("#scorevalue").html(score); // update score
  $("#slicesound")[0].play(); // or : document.getElementById("slicesound").play();

    // stop fruit
    clearInterval(action);

    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit

    // send new fruit
    setTimeout(startAction, 500);
});

// FUNCTIONS

function addHearts() {
  $("#trialsLeft").empty();
  for (i = 0; i < trialsLeft; i++) {
    $("#trialsLeft").append('<img src="images/heart.png" class="life">');
  }
}

// start sending fruits
function startAction() {

  // generate a fruit
  $("#fruit1").show();
  chooseFruit(); // choose a rendom fruit
  $("#fruit1").css({
    'left': Math.round(550 * Math.random()),
    'top': -50
  }); //random position

  // generate a random step
  step = 1 + Math.round(5 * Math.random()); // change step

  // move fruit down one step every 10ms
  action = setInterval(function() {

    // move fruit by one step
    $("#fruit1").css('top', $("#fruit1").position().top + step);

    // check if the fruit is too low
    if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
      // check if we have any trials left
      if (trialsLeft > 1) {
        // generate a fruit
        $("#fruit1").show();
        chooseFruit(); // choose a rendom fruit
        $("#fruit1").css({
          'left': Math.round(550 * Math.random()),
          'top': -50
        }); //random position

        // generate a random step
        step = 1 + Math.round(5 * Math.random()); // change step

        // reduce trials by one
        trialsLeft--;

        // populate trialsLeft box
        addHearts();


      } else { // game over
        playing = false; // we are not playing anymore
        $("#startreset").html("Start Game"); // change button to Start game
        $("#gameover").show();
        $("#gameover").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
        $("#trialsLeft").hide();
        stopAction();
      }
    }
  }, 10);
}

// generate a random fruit
function chooseFruit() {
  $("#fruit1").attr('src', 'images/' + fruits[Math.round(8 * Math.random())] + '.png');
}

// stop dropping fruits
function stopAction() {
  clearInterval(action);
  $("#fruit1").hide();
}

});
