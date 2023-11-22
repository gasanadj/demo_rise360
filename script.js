document.addEventListener("DOMContentLoaded", function () {
  const animatedText = document.querySelector(".animated-text");
  const sections = document.querySelectorAll(".hidden-content");
  const homeImg = document.getElementById("home-img");
  const body = document.querySelector(".body");
  setTimeout(function () {
    animatedText.classList.add("hide");
    body.style.backgroundColor = "#007aff";
    sections.forEach((section, index) => {
      section.style.opacity = 1;
    });
    homeImg.style.animation = "throwUp 4s ease 0s forwards";
  }, 5000);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const span = document.querySelectorAll(".h1 span");
      const numbers = document.querySelectorAll(".number");
      const dataNum = document.querySelectorAll(".data");
      const image = document.querySelector(".img-strawberry");
      span.forEach((el) => {
        el.style.opacity = 1;
      });
      numbers.forEach((el) => {
        el.style.opacity = 1;
      });
      dataNum.forEach((el) => {
        el.style.opacity = 1;
      });
      image.style.animation = "throwIn 5s ease 0s forwards";

      observer.unobserve(entry.target);
    }
  });
}
const produceSection = document.querySelector(".produce");
const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5,
});
observer.observe(produceSection);

var drops = document.querySelectorAll("span");
drops.forEach((drop) => {
  let dur = Math.random() * (20 - 10) + 10;
  drop.style.animationDuration = 20 / dur + "s";
});
