document.addEventListener("DOMContentLoaded", function () {
  const animatedText = document.querySelector(".animated-text");
  const sections = document.querySelectorAll(".hidden-content");
  const homeImg = document.getElementById("home-img");
  const body = document.querySelector(".body");
  setTimeout(function () {
    animatedText.classList.add("hide");
    body.style.backgroundColor = "hsla(158, 23%, 18%, 1)";
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

// contact section

let buttons = document.querySelectorAll(".bq > button");

buttons.forEach(addButtonListener);

function addButtonListener(button) {
  button.addEventListener("click", function () {
    const userMessage = this.innerText;

    // Append user message to chat
    appendMessage(userMessage, "user");

    // Generate and append bot's reply
    let replies = getBotReply(userMessage);
    appendBotReplies(replies);
  });
}

function appendMessage(message, sender) {
  const messagesDiv = document.querySelector(".messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `${sender}-message`;
  messageDiv.innerText = message;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  scrollToBottom();
}

function getBotReply(userMessage) {
  switch (userMessage) {
    case "Tell me about RiseFarmer360":
      return [
        "RiseFarmer360 is a transformative web application designed to support farmers in Sub-Saharan Africa.",
        "It addresses challenges by offering modern farming resources, a knowledge-sharing network, a marketplace, and localized weather forecasts.",
        "What specific aspect are you interested in?",
      ];
    case "How does RiseFarmer360 help farmers?":
      return [
        "RiseFarmer360 empowers farmers through a comprehensive approach.",
        "It provides resources on modern farming techniques, fosters collaboration through a knowledge-sharing network, facilitates market access, and offers localized weather forecasts.",
        "The goal is to enhance productivity, resilience, and prosperity for Sub-Saharan farmers.",
      ];
    case "What makes RiseFarmer360 unique?":
      return [
        "RiseFarmer360 stands out by combining education, market facilitation, and climate technology in one platform.",
        "The innovative peer-to-peer learning network promotes community-driven progress and empowerment.",
        "This approach fosters a sustainable growth mindset, allowing farmers to embrace agricultural techniques and seize market opportunities.",
      ];
    case "How can farmers access RiseFarmer360?":
      return [
        "Farmers can access RiseFarmer360 through the web application.",
        "They can utilize the platform for modern farming resources, collaboration, market access, and weather forecasts.",
        "The goal is to transform farming practices and improve the lives of millions of hardworking farmers.",
      ];
    case "What are the ultimate goals of RiseFarmer360?":
      return [
        "RiseFarmer360 aims to drive development, enhance food security, and improve the lives of millions of hardworking farmers in Sub-Saharan Africa.",
        "By consolidating services into one platform, the project strives to transform farming practices and contribute to the overall prosperity of the farming community.",
      ];
    case "Who are the brains behind RiseFarmer360?":
      return [
        "RiseFarmer360 was developed by a team of six students",
        "Kathrine Ganda",
        "Grace Nalule",
        "Irene Agigiba",
        "Charite Uwatwembi",
        "Mary Doh",
        "Didas Junior",
      ];
    default:
      return ["Sorry, I don't understand that."];
  }
}

function appendQuestionButtons() {
  const messagesDiv = document.querySelector(".messages");

  const questions = [
    "Tell me about RiseFarmer360",
    "How does RiseFarmer360 help farmers?",
    "What makes RiseFarmer360 unique?",
    "How can farmers access RiseFarmer360?",
    "What are the ultimate goals of RiseFarmer360?",
    "Who are the brains behind RiseFarmer360?",
  ];

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-holder-group";

  questions.forEach((question) => {
    const buttonHolder = document.createElement("div");
    buttonHolder.className = "button-holder bq";

    const button = document.createElement("button");
    button.className = "bq";
    button.innerText = question;

    buttonHolder.appendChild(button);
    buttonGroup.appendChild(buttonHolder);

    // Add the click event listener to the newly created button
    addButtonListener(button);
  });

  messagesDiv.appendChild(buttonGroup);

  scrollToBottom();
}

// Append the initial set of question buttons when the chatbot loads
appendQuestionButtons();

function scrollToBottom() {
  const messagesDiv = document.querySelector(".messages");
  const lastChild = messagesDiv.lastChild;
  lastChild.scrollIntoView({ behavior: "smooth" });
}

function appendBotReplies(replies, index = 0) {
  if (index < replies.length) {
    setTimeout(() => {
      appendMessage(replies[index], "bot");
      appendBotReplies(replies, index + 1);
    }, 1000); // 1 second delay
  } else {
    // After all bot replies, display the question buttons again.
    appendQuestionButtons();
  }
}

// close the modal
document.addEventListener("DOMContentLoaded", function () {
  const closeButton = document.querySelector(".close");
  const contactSection = document.querySelector(".contact");

  closeButton.addEventListener("click", function () {
    contactSection.style.display = "none";
  });

  ScrollReveal({
    reset: true,
    distance: "80px",
    duration: 4000,
    delay: 200,
  });

  ScrollReveal().reveal(".banner, .banner-text", { origin: "left" });
  ScrollReveal().reveal(".rain", { origin: "right" });
  ScrollReveal().reveal(".money-market", { origin: "bottom" });
  ScrollReveal().reveal(".market-text", { origin: "right" });
  ScrollReveal().reveal("#data-one, #data-two, #data-five", {
    origin: "right",
  });
  ScrollReveal().reveal("#data-three, #data-four", { origin: "left" });
  ScrollReveal().reveal(".money-market2", { origin: "top" });
  ScrollReveal().reveal(".market-text2", { origin: "left" });
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("cont");
  const contactSection = document.querySelector(".contact");
  btn.addEventListener("click", () => {
    console.log("clicked");
    contactSection.style.display = "block";
  });

  const btn2 = document.getElementById("cont1");
  btn2.addEventListener("click", () => {
    contactSection.style.display = "block";
  });
});
