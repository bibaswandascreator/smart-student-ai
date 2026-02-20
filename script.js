// Load saved chat when page opens
window.onload = function () {
  loadChat();
};

// ========== MENU FUNCTIONS ==========
function toggleMenu() {
  document.getElementById("sideMenu").classList.add("active");
  document.getElementById("overlay").classList.add("active");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}

function newChat() {
  document.querySelector(".chat-container").innerHTML = "";
  closeMenu();
}

function showHistory() {
  loadChat();
  closeMenu();
}

function aboutUs() {
  alert("SMART STUDENT AI\nCreated by BIBOS CREATION 🚀");
  closeMenu();
}

// ========== CHAT FUNCTIONS ==========

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();

  if (message === "") return;

  const chatContainer = document.querySelector(".chat-container");

  // User message box
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = message;
  chatContainer.appendChild(userMsg);

  // Bot message box
  const botMsg = document.createElement("div");
  botMsg.className = "message bot";

  // Try solving math
  try {
    if (/^[0-9+\-*/().\s^]+$/.test(message)) {
      const result = eval(message.replace("^", "**"));
      botMsg.innerText = result;
    } else {
      botMsg.innerText = "I am SMART STUDENT AI 🤖. Ask me maths or questions!";
    }
  } catch {
    botMsg.innerText = "Invalid math expression.";
  }

  chatContainer.appendChild(botMsg);

  // 🔥 SAVE CHAT HERE
  saveChat();

  // Clear input
  input.value = "";

  // Auto scroll
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// ========== LOCAL STORAGE ==========

function saveChat() {
  const chat = document.querySelector(".chat-container").innerHTML;
  localStorage.setItem("chatHistory", chat);
}

function loadChat() {
  const saved = localStorage.getItem("chatHistory");
  if (saved) {
    document.querySelector(".chat-container").innerHTML = saved;
  }
}
