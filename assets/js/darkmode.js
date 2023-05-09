let darkModeState = false;
function load() {
  const button = document.querySelector(".btn");

  // MediaQueryList object
  const useDark = window.matchMedia("(prefers-color-scheme: dark)");

  // Toggles the "dark-mode" class
  function toggleDarkMode(state) {
    document.documentElement.classList.toggle("dark-mode", state);
    darkModeState = state;
  }

  // Sets localStorage state
  function setDarkModeLocalStorage(state) {
    localStorage.setItem("dark-mode", state);
  }
  // Initial setting
  toggleDarkMode(localStorage.getItem("dark-mode") == "true");

  if (darkModeState) {
    document.getElementById("colorbutton").innerHTML = "light (pink)";
  } else {
    document.getElementById("colorbutton").innerHTML = "dark (teal)";
  }
  // Listen for changes in the OS settings.
  // Note: the arrow function shorthand works only in modern browsers,
  // for older browsers define the function using the function keyword.
  useDark.addListener((evt) => toggleDarkMode(evt.matches));

  // Toggles the "dark-mode" class on click and sets localStorage state
  button.addEventListener("click", () => {
    darkModeState = !darkModeState;
    //console.log(darkModeState);
    if (darkModeState) {
      document.getElementById("colorbutton").innerHTML = "light (pink)";
    } else {
      document.getElementById("colorbutton").innerHTML = "dark (teal)";
    }
    toggleDarkMode(darkModeState);
    setDarkModeLocalStorage(darkModeState);
  });
}
window.addEventListener("DOMContentLoaded", load);
