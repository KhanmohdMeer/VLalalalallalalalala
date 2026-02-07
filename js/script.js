const DEV_OVERRIDE = new URLSearchParams(window.location.search).has("dev");

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS LOADED");

  const lockScreen = document.getElementById("lockScreen");
  const main       = document.getElementById("mainContent");
  const msgEl      = document.getElementById("typeMessage");
  const gifBox     = document.getElementById("gifBox");
  const responseEl = document.getElementById("responseText");

  const yesBtn = document.getElementById("yesBtn");
  const noBtn  = document.getElementById("noBtn");

  console.log("yesBtn:", yesBtn);
  console.log("noBtn:", noBtn);

  // 🔴 IF THESE ARE NULL → HTML IS WRONG

  main.style.display = "none";

  const fullHTML = msgEl.innerHTML;
  msgEl.innerHTML = "";

  function startTyping() {
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

  function unlock() {
    console.log("UNLOCK CALLED");
    lockScreen.style.display = "none";
    main.style.display = "block";
    startTyping();
  }

  // 🔓 DEV OVERRIDE
  if (DEV_OVERRIDE) {
    unlock();
  }

  // ✅ BUTTON EVENTS (GUARANTEED)
  yesBtn.addEventListener("click", () => {
    console.log("YES CLICKED");
    window.location.href = "html/yes.html";
  });

  noBtn.addEventListener("click", () => {
    console.log("NO CLICKED");
    responseEl.textContent = "That’s completely okay 🤍";
    setTimeout(() => {
      window.location.href = "html/no.html";
    }, 800);
  });
});