export function setupThemeToggle() {
    const themeBtn = document.querySelector(".theme-box");
    const savedMode = localStorage.getItem("currentMode") || "Dark";
    themeBtn.textContent = savedMode;
    applyTheme(savedMode);
  
    themeBtn.addEventListener("click", () => {
      const current = themeBtn.textContent;
      const newMode = current === "Dark" ? "Light" : "Dark";
      localStorage.setItem("currentMode", newMode);
      themeBtn.textContent = newMode;
      applyTheme(newMode);
    });
  }
  
  function applyTheme(mode) {
    document.body.classList.toggle("light-mode", mode === "Dark");
    document.body.classList.toggle("dark-mode", mode === "Light");
  }
  