// // === CONFIGURATION ===
// const RESULT_DELAY_MINUTES = 2; // Delay for showing results
// let voteCount = JSON.parse(localStorage.getItem("voteCount")) || {};
// let resultTimeoutSet = false;

// // === DOM ELEMENTS ===
// const voteBtn = document.querySelector(".vote-button");
// const messageDiv = document.getElementById("message");
// const voteSection = document.getElementById("voteSection");
// const resultSection = document.getElementById("resultSection");
// const resultList = document.getElementById("resultList");
// const timerDiv = document.getElementById("timer");

// // === VOTE HANDLER ===
// if (voteBtn && messageDiv) {
//   voteBtn.addEventListener("click", () => {
//     if (localStorage.getItem("hasVoted")) {
//       messageDiv.textContent = "❌ You have already voted!";
//       messageDiv.style.color = "red";
//       return;
//     }

//     const candidate = document.querySelector('input[name="candidate"]:checked');
//     if (!candidate) {
//       messageDiv.textContent = "⚠️ Please select a candidate before voting.";
//       messageDiv.style.color = "red";
//       return;
//     }

//     const name = candidate.value;
//     voteCount[name] = (voteCount[name] || 0) + 1;

//     localStorage.setItem("hasVoted", "true");
//     localStorage.setItem("voteCount", JSON.stringify(voteCount));

//     messageDiv.textContent = `✅ You voted for ${name}. Thank you!`;
//     messageDiv.style.color = "green";
//     voteBtn.disabled = true;

//     endVoting();
//   });
// }

// // === END VOTING FUNCTION ===
// function endVoting() {
//   voteBtn.disabled = true;
//   if (!resultTimeoutSet) {
//     resultTimeoutSet = true;
//     setTimeout(showResults, RESULT_DELAY_MINUTES * 60 * 1000);
//     startTimer(RESULT_DELAY_MINUTES * 60);
//   }
// }

// // === TIMER FUNCTION ===
// function startTimer(seconds) {
//   let remaining = seconds;
//   const interval = setInterval(() => {
//     const min = Math.floor(remaining / 60);
//     const sec = remaining % 60;
//     timerDiv.textContent = `Results in: ${min}:${sec < 10 ? "0" : ""}${sec}`;
//     remaining--;
//     if (remaining < 0) {
//       clearInterval(interval);
//       timerDiv.textContent = "";
//     }
//   }, 1000);
// }

// // === SHOW RESULTS FUNCTION ===
// function showResults() {
//   voteSection.classList.add("hidden");
//   resultSection.classList.remove("hidden");
//   resultList.innerHTML = "";

//   for (const [candidate, count] of Object.entries(voteCount)) {
//     const li = document.createElement("li");
//     li.textContent = `${candidate}: ${count} vote${count > 1 ? "s" : ""}`;
//     resultList.appendChild(li);
//   }
// }
// //voting time duration
//  const VOTING_DURATION = 60 * 1000; // 1 minute in milliseconds
//     const message = document.getElementById("message");
//     const timer = document.getElementById("timer");
//     const votingEndTime = Date.now() + VOTING_DURATION;
//      const countdown = setInterval(() => {
//       const remaining = votingEndTime - Date.now();
//       if (remaining <= 0) {
//         clearInterval(countdown);
//         voteBtn.disabled = true;
//         timer.textContent = "⏳ Voting closed!";
//       } else {
//         const seconds = Math.ceil(remaining / 1000);
//         timer.textContent = `⏱ Time remaining: ${seconds}s`;
//       }
//     }, 1000);
//      if (Date.now() > votingEndTime) {
//         message.textContent = "❌ Voting time is over!";
//         message.style.color = "red";
//       } else {
//         message.textContent = `✅ You voted for ${selected.value}.`;
//         message.style.color = "green";
//         voteBtn.disabled = true; // Prevent multiple votes
//       }



const RESULT_DELAY_MINUTES = 2; // Delay for showing results
const VOTING_DURATION = 60 * 1000; // 1 minute voting duration

let voteCount = JSON.parse(localStorage.getItem("voteCount")) || {};
let resultTimeoutSet = false;

// === DOM ELEMENTS ===
const voteBtn = document.querySelector(".vote-button");
const messageDiv = document.getElementById("message");
const voteSection = document.getElementById("voteSection");
const resultSection = document.getElementById("resultSection");
const resultList = document.getElementById("resultList");
const timerDiv = document.getElementById("timer");

// === START COUNTDOWN ===
const votingEndTime = Date.now() + VOTING_DURATION;
const countdown = setInterval(() => {
  const remaining = votingEndTime - Date.now();
  if (remaining <= 0) {
    clearInterval(countdown);
    voteBtn.disabled = true;
    timerDiv.textContent = "⏳ Voting closed!";
  } else {
    const seconds = Math.ceil(remaining / 1000);
    timerDiv.textContent = `⏱ Time remaining: ${seconds}s`;
  }
}, 1000);

// === VOTE HANDLER ===
voteBtn.addEventListener("click", () => {
  if (localStorage.getItem("hasVoted")) {
    messageDiv.textContent = "❌ You have already voted!";
    messageDiv.style.color = "red";
    return;
  }
  if (Date.now() > votingEndTime) {
    messageDiv.textContent = "❌ Voting time is over!";
    messageDiv.style.color = "red";
    return;
  }

  const candidate = document.querySelector('input[name="candidate"]:checked');
  if (!candidate) {
    messageDiv.textContent = "⚠️ Please select a candidate before voting.";
    messageDiv.style.color = "red";
    return;
  }

  const name = candidate.value;
  voteCount[name] = (voteCount[name] || 0) + 1;
  localStorage.setItem("hasVoted", "true");
  localStorage.setItem("voteCount", JSON.stringify(voteCount));

  messageDiv.textContent = `✅ You voted for ${name}. Thank you!`;
  messageDiv.style.color = "green";
  voteBtn.disabled = true;

  endVoting();
});

// === END VOTING FUNCTION ===
function endVoting() {
  voteBtn.disabled = true;
  if (!resultTimeoutSet) {
    resultTimeoutSet = true;
    setTimeout(showResults, RESULT_DELAY_MINUTES * 60 * 1000);
    startTimer(RESULT_DELAY_MINUTES * 60);
  }
}

// === TIMER FUNCTION (for results delay) ===
function startTimer(seconds) {
  let remaining = seconds;
  const interval = setInterval(() => {
    const min = Math.floor(remaining / 60);
    const sec = remaining % 60;
    timerDiv.textContent = `Results in: ${min}:${sec < 10 ? "0" : ""}${sec}`;
    remaining--;
    if (remaining < 0) {
      clearInterval(interval);
      timerDiv.textContent = "";
    }
  }, 1000);
}

// === SHOW RESULTS FUNC
function showResults() {
   voteSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  resultList.innerHTML = "";

  for (const [candidate, count] of Object.entries(voteCount)) {
    const li = document.createElement("li");
    li.textContent = `${candidate}: ${count} vote${count > 1 ? "s" : ""}`;
    resultList.appendChild(li);
  }
// Include zero-vote candidates
  candidates.forEach(candidate => {
    const count = voteCount[candidate] || 0;
    const li = document.createElement("li");
    li.textContent = `${candidate}: ${count} vote${count !== 1 ? "s" : ""}`;
    resultList.appendChild(li);
  });
}