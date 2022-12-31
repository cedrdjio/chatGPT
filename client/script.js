import user from "./assets/user.svg";
import bot from "./assets/bot.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";
  loadInterval = setInterval(() => {
    element.textContent += ".";
    if (element.textContent.length > 3) {
      element.textContent = "";
    }
  }, 300);
}
function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index > text.length) {
      element.textContent += text.chartAt[index];
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  const date = Date.now();
  const random = Math.random();
  const hexadecimalString = random.toString(16);
  return `id-${date}-${hexadecimalString}`;
}

function chatStrip(isAi, value, uniqueId) {
  return `
        <div class="wrapper ${isAi && " ai"}">
            <div class="chat">
                <div className="profile">
                <img src="${isAi ? bot : user}" alt="${isAi ? " bot" : "user" }" />
                </div>
                <div class="message" id = ${uniqueId}>${value}</div>
            </div>
        </div>
        `;
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    //user's chatstripe
    chatContainer.innerHTML += chatStrip(false, data.get("prompt"));
    form.reset();
    //bot's chatstripe
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStrip(true, " ", uniqueId);
    const botMessage = document.getElementById(uniqueId);
    loader(botMessage);
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
    if(e.key==="Enter") {
        handleSubmit(e);
    }
});
