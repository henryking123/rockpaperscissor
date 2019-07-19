const $choices = document.querySelectorAll(".choice");
const $score = document.querySelector("#score");
const $restartBtn = document.querySelector("#restart");
const $result = document.querySelector("#result");
const $modal = document.querySelector(".modal");
const scoreBoard = {
  player: 0,
  computer: 0
}

function play(e) {
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  console.log(playerChoice, computerChoice, winner);
  showWinner(winner, computerChoice);
}
$choices.forEach(choice => choice.addEventListener("click", play));

// Get computer choice
function getComputerChoice() {
  const rand = Math.random();

  if (rand < 0.34) {
    return "rock";
  } else if (rand <= 0.66) {
    return "paper"
  } else {
    return "scissors"
  }
}

// Get game winner
function getWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "draw";
  } else if (playerChoice === "rock") {
    if (computerChoice === "paper") {
      return "computer";
    } else {
      return "player";
    }
  } else if (playerChoice === "paper") {
    if (computerChoice === "scissors") {
      return "computer";
    } else {
      return "player";
    }
  } else if (playerChoice === "scissors") {
    if (computerChoice === "rock") {
      return "computer";
    } else {
      return "player";
    }
  }
}

function showWinner(winner, computerChoice) {
  // Show modal
  if (winner === "player") {
    scoreBoard.player++;
    $result.innerHTML =
      /*html*/
      `
      <h1 class="text-win">You Win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</p>

    `;
  } else if (winner === "computer") {
    scoreBoard.computer++;
    $result.innerHTML =
      /*html*/
      `
      <h1 class="text-lose">You Lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</p>
    `;
  } else {
    $result.innerHTML =
      /*html*/
      `
    <h1> It's a Draw</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    <p>Computer Chose ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</p>
  `;
  }
  $modal.style.display = "block";

  // Show or hide Restart Button
  if (!scoreBoard.player && !scoreBoard.computer) {
    $restartBtn.style.display = "none";
  } else {
    $restartBtn.style.display = "inline-block";
  }

  // Update scores
  $score.innerHTML = /*html*/
    `<p>Player: ${scoreBoard.player}</p>
  <p>Computer: ${scoreBoard.computer}</p>`;
}

window.addEventListener("click", e => {
  if (e.target == $modal) {
    $modal.style.display = "none";
  }
})

function restartGame() {
  scoreBoard.player = 0;
  scoreBoard.computer = 0;
  $restartBtn.style.display = "none";

  // Update scores
  $score.innerHTML = /*html*/
    `<p>Player: ${scoreBoard.player}</p>
  <p>Computer: ${scoreBoard.computer}</p>`;
}
$restartBtn.addEventListener("click", restartGame);