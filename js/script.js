document.addEventListener("DOMContentLoaded", () => {

  const TEST_MODE = false; // turn false before final send

  const lockScreen = document.getElementById("lockScreen");
  const countdown = document.getElementById("countdown");
  const msgEl      = document.getElementById("typeMessage");
  const gifBox     = document.getElementById("gifBox");
  const responseEl = document.getElementById("responseText");

  if (!msgEl) return;

  // 🔒 capture text ONCE
  const fullHTML = msgEl.innerHTML;
  msgEl.innerHTML = "";

  let typingStarted = false;

  function startTyping() {
    if (typingStarted) return; // 🔒 prevents double typing
    typingStarted = true;

    let i = 0;

    function type() {
      if (i < fullHTML.length) {
        if (fullHTML[i] === "<") {
          const end = fullHTML.indexOf(">", i);
          msgEl.innerHTML += fullHTML.slice(i, end + 1);
          i = end + 1;
        } else {
          msgEl.innerHTML += fullHTML[i++];
        }
        setTimeout(type, 28);
      } else {
        if (gifBox) gifBox.classList.add("show");
      }
    }

    type();
  }

  // 🔓 unlock immediately in test mode
  function unlock() {
    if (lockScreen) lockScreen.style.display = "none";
    document.body.classList.remove("locked");
    startTyping();
  }

  if (TEST_MODE) {
    unlock();
  }

  // ❌ NO BUTTON
  const noMsgs = [
    "That’s completely okay 🤍",
    "Take your time.",
    "You don’t owe me anything.",
    "I respect how you feel.",
    "Thank you for being honest."
  ];

  let noIndex = 0;

  window.handleNo = function () {
    if (responseEl && noIndex < noMsgs.length) {
      responseEl.textContent = noMsgs[noIndex];
    }
    noIndex++;

    if (noIndex >= 5) {
      window.location.href = "html/no.html";
    }
  };

  // ❤️ YES BUTTON
  window.goYes = function () {
    window.location.href = "html/yes.html";
  };

});