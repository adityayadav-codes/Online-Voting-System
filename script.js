// ---------------- REGISTRATION FORM VALIDATION ----------------
const regForm = document.getElementById("registrationForm");
if (regForm) {
  regForm.addEventListener("submit", function (e) {
    if (!this.checkValidity()) {
      e.preventDefault();
      alert("⚠️ Please fill in all required fields correctly.");
    }
  });
}
//=====theme=====//

// Apply a theme
function applyTheme(theme) {
  if (!theme || theme === "system") {
    html.setAttribute("data-theme", "system");
  } else {
    html.setAttribute("data-theme", theme);
  }
  if (select && select.value !== theme) select.value = theme || "system";
}

// Save theme
function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme || "system");
}

// Load saved theme
applyTheme(localStorage.getItem(THEME_KEY) || "system");

// Theme select change
if (select) {
  select.addEventListener("change", (e) => {
    const t = e.target.value;
    applyTheme(t);
    saveTheme(t);
  });
}

// Cycle button
if (cycleBtn) {
  cycleBtn.addEventListener("click", () => {
    const current = select ? select.value : "system";
    const idx = THEMES.indexOf(current);
    const next = THEMES[(idx + 1) % THEMES.length];
    applyTheme(next);
    saveTheme(next);
  });
}

// Optional: keyboard shortcut (T) to cycle
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "t") {
    const active = document.activeElement;
    const tag = active && active.tagName;
    if (tag !== "INPUT" && tag !== "TEXTAREA") {
      cycleBtn?.click();
    }
  }
});
  // registration
  // Simple front-end validation & feedback
document.getElementById('registrationForm').addEventListener('submit', function(e) {
  const form = e.target;
  if (!form.checkValidity()) {
    e.preventDefault();
    alert('⚠️Please fill in all required fields correctly.');
  }
});
// themes
// theme.js
const THEME_KEY = 'site-theme';
const html = document.documentElement;
const select = document.getElementById('themeSelect');
const cycleBtn = document.getElementById('cycleBtn');

// Available order for cycle
const THEMES = ['system','light','dark','blue'];

// Initialize from localStorage
function applyTheme(theme){
  if(!theme || theme === 'system'){
    // Remove explicit data-theme so system preference applies
    html.setAttribute('data-theme', 'system');
  } else {
    html.setAttribute('data-theme', theme);
  }
  // update select UI
  if(select.value !== theme) select.value = theme || 'system';
}

function saveTheme(theme){
  localStorage.setItem(THEME_KEY, theme || 'system');
}

// Load saved or default
const saved = localStorage.getItem(THEME_KEY) || 'system';
applyTheme(saved);

// UI: select change
select.addEventListener('change', (e) => {
  const t = e.target.value;
  applyTheme(t);
  saveTheme(t);
});

// Cycle button
cycleBtn.addEventListener('click', () => {
  const current = select.value || 'system';
  const idx = THEMES.indexOf(current);
  const next = THEMES[(idx + 1) % THEMES.length];
  applyTheme(next);
  saveTheme(next);
});

// Keyboard shortcut: press "T" to cycle (ignore inputs)
document.addEventListener('theme-controls', (e) => {
  if(e.key.toLowerCase() === 't'){
    const active = document.activeElement;
    const tag = active && active.tagName;
    if(tag !== 'INPUT' && tag !== 'TEXTAREA' && active.getAttribute('role') !== 'textbox'){
      cycleBtn.click();
    }
  }
});
//====for loader screen=======

// it will be represent the hide notent at 2sec.
setTimeout(() => {
  document.getElementById('splash').style.display= 'none';

  document.getElementById('content').style.display= 'block';
}, 1000);
