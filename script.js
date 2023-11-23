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

// Expanding cards
document.addEventListener("DOMContentLoaded", function () {
  const ids = ["pro1", "pro2", "pro3", "pro4"];
  const elements = ids.map((id) => document.getElementById(id));
  let expandingIndex = 0;
  let lastScrollTop = 0;

  function adjustHeightOnScroll() {
    const currentScrollTop = window.scrollY || window.pageYOffset;

    elements.forEach((current, index) => {
      var rect = current.getBoundingClientRect();
      const isScrollingDown = currentScrollTop > lastScrollTop;

      if (
        (isScrollingDown &&
          rect.top < window.innerHeight &&
          rect.bottom >= 0) ||
        (!isScrollingDown && rect.bottom > 0 && rect.top <= window.innerHeight)
      ) {
        var height = window.innerHeight - rect.top;
        if (index === expandingIndex) {
          const maxHeight = 400;
          if (height <= maxHeight) {
            current.style.transition = "height 0.2s ease-in-out";
            current.style.height = height + "px";
            current.classList.add("expanding-element");
          }
          if (height >= maxHeight) {
            expandingIndex = isScrollingDown
              ? Math.min(expandingIndex + 1, elements.length - 1)
              : Math.max(expandingIndex - 1, 0);
          }
        } else {
          const originalHeight = 0;
          current.style.transition = "height 0.2s ease-in-out";
          current.style.height = originalHeight + "px";
          current.classList.remove("expanding-element");
        }
      } else {
        const originalHeight = 0;
        current.style.transition = "height 0.1s ease-in-out";
        current.style.height = originalHeight + "px";
        current.classList.remove("expanding-element");
      }
    });

    lastScrollTop = currentScrollTop;
  }

  window.addEventListener("scroll", adjustHeightOnScroll);
  window.addEventListener("resize", adjustHeightOnScroll);
  adjustHeightOnScroll();
});
