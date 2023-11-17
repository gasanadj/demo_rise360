document.addEventListener("DOMContentLoaded", function () {
  const animatedText = document.querySelector(".animated-text");
  const sections = document.querySelectorAll(".hidden-content");
  const body = document.querySelector(".body");
  setTimeout(function () {
    animatedText.classList.add("hide");
    body.style.backgroundColor = "#007aff";
    sections.forEach((section, index) => {
      section.style.opacity = 1;
    });
  }, 9000);
});
