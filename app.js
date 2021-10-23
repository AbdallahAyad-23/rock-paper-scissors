(function () {
  const plays = ["rock", "paper", "scissors"];
  const modal = document.querySelector(".modal");
  const rulesBtn = document.querySelector(".rulesbtn");
  const closeModalBtn = document.querySelector(".modal__close");
  const main = document.querySelector(".main");
  const mainTitle = document.querySelectorAll(".main__title");
  const mainFinal = document.querySelector(".main__final");
  const mainResult = document.querySelector(".main__result");
  const comPick = document.querySelector(".main__pick--computer");
  const playAgainBtn = document.querySelector(".playbtn");
  const score = document.querySelector(".scoreboard__result");

  let comChoice;

  const initScore = () => {
    score.textContent = localStorage.getItem("score") || 0;
  };
  const incScore = (num) => {
    if (+score.textContent + num < 0) return;
    score.textContent = +score.textContent + num;
    localStorage.setItem("score", +score.textContent);
  };

  const genComputerChoice = () => {
    return plays[Math.floor(Math.random() * plays.length)];
  };

  const getPlayResult = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) return "draw";
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      return "won";
    } else {
      return "lose";
    }
  };

  const play = (playerChoice, playerPick) => {
    playerPick.classList.add("main__pick--player");
    main.classList.add("main--hidden");
    mainTitle.forEach((title) => title.classList.add("main__title--show"));
    comPick.classList.add("main__pick--show");
    comChoice = genComputerChoice();
    setTimeout(() => {
      comPick.classList.add(`main__pick--${comChoice}`);
      const result = getPlayResult(playerChoice, comChoice);
      if (result === "won") {
        incScore(1);
        mainResult.children[0].textContent = "YOU WIN";
      } else if (result === "lose") {
        incScore(-1);
        mainResult.children[0].textContent = "YOU LOSE";
      } else {
        mainResult.children[0].textContent = "DRAW";
      }
      mainFinal.classList.add("main__final--show");
    }, 3000);
  };

  const playAgain = () => {
    main.classList.remove("main--hidden");
    mainTitle.forEach((title) => title.classList.remove("main__title--show"));
    comPick.classList.remove("main__pick--show");
    comPick.classList.remove(`main__pick--${comChoice}`);
    mainFinal.classList.remove("main__final--show");
    if (document.querySelector(".main__pick--player")) {
      document
        .querySelector(".main__pick--player")
        .classList.remove("main__pick--player");
    }
  };

  const initEvents = () => {
    rulesBtn.addEventListener("click", (e) => {
      modal.classList.add("modal--open");
    });
    closeModalBtn.addEventListener("click", (e) => {
      modal.classList.remove("modal--open");
    });
    main.addEventListener("click", (e) => {
      if (e.target.classList.contains("main__pick")) {
        const pick = e.target.getAttribute("data-pick");
        play(pick, e.target);
      }
    });
    playAgainBtn.addEventListener("click", (e) => {
      playAgain();
    });
  };
  initScore();
  initEvents();
})();
