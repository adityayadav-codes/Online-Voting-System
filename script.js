  const voteBtn = document.querySelector(".btn.vote-button");
  const messageDiv = document.getElementById("message");

  if (voteBtn && messageDiv) {
    voteBtn.addEventListener("click", () => {
      const candidate = document.querySelector('input[name="candidate"]:checked');

      if (candidate) {
        messageDiv.textContent = `✅ You voted for ${candidate.value}. Thank you!`;
        messageDiv.style.color = "green";
      } else {
        messageDiv.textContent = "⚠️ Please select a candidate before voting.";
        messageDiv.style.color = "red";
      }
    });
  }