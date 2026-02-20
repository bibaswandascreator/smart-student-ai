let chats = [];
let currentChatId = null;

// ================= LOAD ON START =================
window.onload = function () {
  const saved = localStorage.getItem("allChats");

  if (saved) {
    chats = JSON.parse(saved);
    if (chats.length > 0) {
      loadChatById(chats[chats.length - 1].id);
    }
  } else {
    createNewChat();
  }
};

// ================= MENU =================
function toggleMenu() {
  document.getElementById("sideMenu").classList.add("active");
  document.getElementById("overlay").classList.add("active");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}

// ================= NEW CHAT =================
function createNewChat() {
  const newId = "chat_" + Date.now();

  const newChat = {
    id: newId,
    name: "Chat " + (chats.length + 1),
    messages: ""
  };

  chats.push(newChat);
  currentChatId = newId;

  saveAllChats();
  document.querySelector(".chat-container").innerHTML = "";
}

function newChat() {
  createNewChat();
  closeMenu();
}

// ================= SEND MESSAGE =================
function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  const chatContainer = document.querySelector(".chat-container");

  const userMsg = document.createElement("div");
  userMsg.className = "message";
  userMsg.innerText = "You: " + message;
  chatContainer.appendChild(userMsg);

  const botMsg = document.createElement("div");
  botMsg.className = "message";

  try {
    if (/^[0-9+\-*/().\s^]+$/.test(message)) {
      const result = eval(message.replace("^", "**"));
      botMsg.innerText = "AI: " + result;
    } else {
      botMsg.innerText = "AI: I am SMART STUDENT AI 🤖";
    }
  } catch {
    botMsg.innerText = "AI: Invalid math expression.";
  }

  chatContainer.appendChild(botMsg);

  input.value = "";
  chatContainer.scrollTop = chatContainer.scrollHeight;

  saveCurrentChat();
}

// ================= SAVE =================
function saveCurrentChat() {
  const chatHTML = document.querySelector(".chat-container").innerHTML;
  const chat = chats.find(c => c.id === currentChatId);
  if (chat) chat.messages = chatHTML;
  saveAllChats();
}

function saveAllChats() {
  localStorage.setItem("allChats", JSON.stringify(chats));
}

// ================= LOAD CHAT =================
function loadChatById(id) {
  const chat = chats.find(c => c.id === id);
  if (!chat) return;

  currentChatId = id;
  document.querySelector(".chat-container").innerHTML = chat.messages;
}

// ================= HISTORY =================
function showHistory() {
  const sideMenu = document.getElementById("sideMenu");

  sideMenu.innerHTML = `
    <div class="menu-header">
      SMART STUDENT AI <br> BY BIBOS CREATION
    </div>
    <div class="history-container">
      <div class="new-chat-btn" id="new-chat-btn">+ New Chat</div>
      <div class="about-btn" id="about-btn">About Us</div>
      <div class="history-list" id="history-list"></div>
    </div>
  `;

  // Always attach About Us handler
  document.getElementById("about-btn").onclick = function() {
    window.open('https://bibaswandas11.github.io/Bibos-creation', '_blank');
    closeMenu();
  };

  document.getElementById("new-chat-btn").onclick = function() {
    newChat();
    showHistory(); // refresh list
  };

  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";

  chats.forEach(chat => {
    const item = document.createElement("div");
    item.className = "history-item";

    const title = document.createElement("div");
    title.className = "history-title";
    title.textContent = chat.name;
    item.appendChild(title);

    const renameBtn = document.createElement("button");
    renameBtn.textContent = "✏";
    renameBtn.onclick = function(e) {
      e.stopPropagation();
      renameChat(chat.id);
    };
    item.appendChild(renameBtn);

    item.onclick = function() {
      selectChat(chat.id);
    };

    historyList.appendChild(item);
  });
}

// ================= SELECT CHAT =================
function selectChat(id) {
  loadChatById(id);
  closeMenu();
}

// ================= RENAME CHAT =================
function renameChat(id) {
  const chat = chats.find(c => c.id === id);
  if (!chat) return;

  const newName = prompt("Enter new chat name:", chat.name);
  if (newName && newName.trim() !== "") {
    chat.name = newName.trim();
    saveAllChats();
    showHistory(); // refresh list
  }
}
