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

  // Safety
  if (!msgEl || !yesBtn || !noBtn) return;

  // Hide content until unlock
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
        // ✅ show gif and KEEP it visible
        gifBox.classList.add("show");
        gifBox.style.pointerEvents = "none";
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

  // 🔓 DEV OVERRIDE (for testing)
  if (DEV_OVERRIDE) {
    unlock();
  } else {
    // Normal lock (date logic already tested earlier)
    // Keep locked unless date condition met
    // If today >= unlock date → call unlock()
    // (Your existing date logic can stay here)
  }

  /* ===============================
     NO BUTTON (5-STEP FLOW)
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

    // After all messages shown
    window.location.href = "html/no.html";
  });

  /* ===============================
     YES BUTTON
  ================================ */
  yesBtn.addEventListener("click", () => {
    window.location.href = "html/yes.html";
  });

});