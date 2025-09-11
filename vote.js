// === CONFIGURATION ===
const RESULT_DELAY_MINUTES = 2; // Delay for showing results
let voteCount = JSON.parse(localStorage.getItem("voteCount")) || {};
let resultTimeoutSet = false;

// === DOM ELEMENTS ===
const voteBtn = document.querySelector(".vote-button");
const messageDiv = document.getElementById("message");
const voteSection = document.getElementById("voteSection");
const resultSection = document.getElementById("resultSection");
const resultList = document.getElementById("resultList");
const timerDiv = document.getElementById("timer");

// === VOTE HANDLER ===
if (voteBtn && messageDiv) {
  voteBtn.addEventListener("click", () => {
    if (localStorage.getItem("hasVoted")) {
      messageDiv.textContent = "❌ You have already voted!";
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
}

// === END VOTING FUNCTION ===
function endVoting() {
  voteBtn.disabled = true;
  if (!resultTimeoutSet) {
    resultTimeoutSet = true;
    setTimeout(showResults, RESULT_DELAY_MINUTES * 60 * 1000);
    startTimer(RESULT_DELAY_MINUTES * 60);
  }
}

// === TIMER FUNCTION ===
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

// === SHOW RESULTS FUNCTION ===
function showResults() {
  voteSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  resultList.innerHTML = "";

  for (const [candidate, count] of Object.entries(voteCount)) {
    const li = document.createElement("li");
    li.textContent = `${candidate}: ${count} vote${count > 1 ? "s" : ""}`;
    resultList.appendChild(li);
  }
}