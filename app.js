/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,
  roundScore,
  activePlayer,
  lastRoll,
  count,
  finalScore,
  gamePlaying; //gamePlaying is a state variable, to check if the game is being played or it finished.
init();

// Event Listener
document.querySelector(".btn-roll").addEventListener("click", function() {
  // check the state variable gamePlaying, if true, keeps rolling the dice. If false, skip
  if (gamePlaying) {
    // 1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    var thisRoll = dice;

    //2. Update the round score IF the rolled number was not a 1
    if (dice !== 1) {
      // add score
      roundScore += dice + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
    if (dice2 === 1) {
      nextPlayer();
    }
    // check if roll 6 twice
    if (dice === 6) {
      lastRoll = 6;
      count += 1;
    } else {
      lastRoll = 0;
      count = 0;
    }

    //3. if roll 6 twice, lose total score and next player turn
    if (thisRoll === 6 && lastRoll === 6 && count === 2) {
      scores[activePlayer] = 0;

      document.getElementById("score-" + activePlayer).textContent =
        scores[activePlayer];

      nextPlayer();
    }

    //4.display the result
    var diceDOM = document.querySelector(".dice");
    var diceDOM2 = document.querySelector(".dice2");
    diceDOM.style.display = "block";
    diceDOM2.style.display = "block";

    diceDOM.src = "dice-" + dice + ".png";
    diceDOM2.src = "dice-" + dice2 + ".png";
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //Add Current score to Global score
    scores[activePlayer] += roundScore;
    var winningScore;
    // set the final score for winning the game
    finalScore = document.querySelector('.final-score').value;


    // undefined, 0, null or "" are coerced to false
    // Anything else is coerced to true
    if(finalScore){
      winningScore = finalScore;
    } else {
      winningScore = 100;
    }

    //update the UI with the player score
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

////////////////////////////////////////////////////////////////////////

// FUNCTONS
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
  // next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  // set current score to 0 in the DOM
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // toggle the active css style to the current player
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // hide the dice when switching players
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}
