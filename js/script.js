// ===============================
// DEV OVERRIDE (?dev)
// ===============================
const DEV_OVERRIDE = new URLSearchParams(window.location.search).has("dev");

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CONFIG
  ================================ */
  const UNLOCK_DATE = {
    year: 2026,
    month: 1, // Feb (0 = Jan)
    day: 14
  };

  /* ===============================
     DOM
  ================================ */
  const lockScreen = document.getElementById("lockScreen");
  const countdown  = document.getElementById("countdown");
  const main       = document.getElementById("mainContent");
  const msgEl      = document.getElementById("typeMessage");
  const gifBox     = document.getElementById("gifBox");
  const responseEl = document.getElementById("responseText");

  const yesBtn = document.getElementById("yesBtn");
  const noBtn  = document.getElementById("noBtn");

  // HARD SAFE
  main.style.display = "none";

  /* ===============================
     TYPEWRITER
  ================================ */
  const fullHTML = msgEl.innerHTML;
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
        gifBox.classList.add("show");
      }
    }
    type();
  }

  /* ===============================
     UNLOCK
  ================================ */
  function unlock() {
    lockScreen.style.display = "none";
    document.body.classList.remove("locked");
    main.style.display = "block";
    startTyping();
  }

  /* ===============================
     DEV OVERRIDE
  ================================ */
  if (DEV_OVERRIDE) {
    unlock();
  } else {
    // DATE LOCK
    function todayDate() {
      const n = new Date();
      return new Date(n.getFullYear(), n.getMonth(), n.getDate());
    }

    const unlockDate = new Date(
      UNLOCK_DATE.year,
      UNLOCK_DATE.month,
      UNLOCK_DATE.day
    );

    function updateLock() {
      const today = todayDate();

      if (today >= unlockDate) {
        unlock();
        return;
      }

      const diffDays = Math.ceil(
        (unlockDate - today) / 86400000
      );
      countdown.textContent = `${diffDays} day(s) to go 🤍`;
    }

    setInterval(updateLock, 1000);
    updateLock();
  }

  /* ===============================
     BUTTON LOGIC (MOBILE SAFE)
  ================================ */
  const noMsgs = [
    "That’s completely okay 🤍",
    "Take your time.",
    "You don’t owe me anything.",
    "I respect how you feel.",
    "Thank you for being honest."
  ];

  let noIndex = 0;

  noBtn.addEventListener("click", () => {
    if (noIndex < noMsgs.length) {
      responseEl.textContent = noMsgs[noIndex++];
    }

    if (noIndex >= noMsgs.length) {
      window.location.href = "html/no.html";
    }
  });

  yesBtn.addEventListener("click", () => {
    window.location.href = "html/yes.html";
  });

});