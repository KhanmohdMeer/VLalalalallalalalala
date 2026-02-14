// 🔑 DEV OVERRIDE (use ?dev in URL)
const DEV_OVERRIDE = new URLSearchParams(window.location.search).has("dev");

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CONFIG
  ================================ */
  const TEST_MODE = false; // 🔴 keep FALSE for final send

  /* ===============================
     DOM
  ================================ */
  const lockScreen = document.getElementById("lockScreen");
  const countdown  = document.getElementById("countdown");
  const msgEl      = document.getElementById("typeMessage");
  const gifBox     = document.getElementById("gifBox");
  const responseEl = document.getElementById("responseText");

  if (!msgEl) return;

  /* ===============================
     TYPEWRITER SETUP
  ================================ */
  const fullHTML = msgEl.innerHTML; // capture once
  msgEl.innerHTML = "";

  let typingStarted = false;

  function startTyping() {
    if (typingStarted) return;
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

  /* ===============================
     UNLOCK HANDLER
  ================================ */
  function unlock() {
    if (lockScreen) lockScreen.style.display = "none";
    document.body.classList.remove("locked");
    startTyping();
  }

  /* ===============================
     DEV / TEST OVERRIDE
  ================================ */
  if (TEST_MODE || DEV_OVERRIDE) {
    unlock();
    return;
  }

  /* ===============================
     DATE LOCK (14 FEB)
  ================================ */
  const unlockTime = new Date("2026-02-14T00:00:00").getTime();

  function updateLock() {
    const now = Date.now();
    const diff = unlockTime - now;

    if (diff <= 0) {
      unlock();
      return;
    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);

    if (countdown) {
      countdown.textContent = `${h}h ${m}m`;
    }
  }

  setInterval(updateLock, 1000);
  updateLock();

  /* ===============================
     NO BUTTON LOGIC
  ================================ */
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

    if (noIndex >= noMsgs.length) {
      window.location.href = "html/no.html";
    }
  };

  /* ===============================
     YES BUTTON
  ================================ */
  window.goYes = function () {
    window.location.href = "html/yes.html";
  };

});