// ===============================
// DEV OVERRIDE (?dev)
// ===============================
const DEV_OVERRIDE = new URLSearchParams(window.location.search).has("dev");

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     DOM
  ================================ */
  const lockScreen = document.getElementById("lockScreen");
  const main       = document.getElementById("mainContent");
  const msgEl      = document.getElementById("typeMessage");
  const gifBox     = document.getElementById("gifBox");
  const responseEl = document.getElementById("responseText");

  const yesBtn = document.getElementById("yesBtn");
  const noBtn  = document.getElementById("noBtn");

  if (!msgEl || !yesBtn || !noBtn) return;

  // HARD SAFE STATE
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
        gifBox.style.pointerEvents = "none";
      }
    }
    type();
  }

  /* ===============================
     UNLOCK (CRITICAL FIX)
  ================================ */
  function unlock() {
    // 🔴 COMPLETELY DISABLE LOCK SCREEN
    lockScreen.style.display = "none";
    lockScreen.style.pointerEvents = "none";

    document.body.classList.remove("locked");
    main.style.display = "block";

    startTyping();
  }

  // 🔓 DEV OVERRIDE
  if (DEV_OVERRIDE) {
    unlock();
  }

  /* ===============================
     NO BUTTON (5 STEPS)
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
      return;
    }
    window.location.href = "html/no.html";
  });

  /* ===============================
     YES BUTTON
  ================================ */
  yesBtn.addEventListener("click", () => {
    window.location.href = "html/yes.html";
  });

});