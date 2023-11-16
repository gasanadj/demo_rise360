document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".animated-text").classList.add("start-animation");

  const sections = document.querySelectorAll(".hidden-content");

  setTimeout(function () {
    document.querySelector(".animated-text").classList.add("hide");
    sections.forEach((section) => {
      section.classList.remove("hidden-content");
    });
  }, 6500);
});
