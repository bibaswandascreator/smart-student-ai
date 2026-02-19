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
