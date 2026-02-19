let userName = "";

function addMessage(text, sender) {
  const chat = document.getElementById("chat");

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = sender === "user" ? "flex-end" : "flex-start";

  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerHTML = text;

  wrapper.appendChild(message);
  chat.appendChild(wrapper);

  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  let response = "";

  try {
    const result = math.evaluate(text);
    response = "Answer: " + result;
  } catch {
    response = "I can solve math expressions like 2+3*5 or (5+3)^2.";
  }

  addMessage(response, "bot");
}
