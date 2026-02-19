let userName = "";

/* ---------------- MESSAGE SYSTEM ---------------- */

function addMessage(text, sender) {
  const chat = document.getElementById("chat");

  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerHTML = text;

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

function showTyping() {
  const chat = document.getElementById("chat");

  const typing = document.createElement("div");
  typing.classList.add("message", "bot");
  typing.id = "typing";
  typing.innerHTML = "Typing...";

  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

/* ---------------- ESSAY GENERATOR ---------------- */

function generateEssay(topic) {
  return `
    <strong>Essay on ${capitalize(topic)}</strong><br><br>

    ${capitalize(topic)} is an important subject in today's world.
    It plays a significant role in shaping individuals and society.
    Understanding ${topic} helps us develop awareness and responsibility.<br><br>

    There are several aspects related to ${topic}. It influences
    people in different ways and has both positive and negative impacts.
    Proper knowledge about ${topic} allows us to make better decisions.<br><br>

    In conclusion, ${topic} is a meaningful topic that deserves attention.
    With proper understanding and action, we can create positive change.
  `;
}

/* ---------------- KNOWLEDGE BASE ---------------- */

function getKnowledge(question) {
  const knowledge = {
    "photosynthesis": "Photosynthesis is the process by which green plants make food using sunlight, carbon dioxide, and water.",
    "gravity": "Gravity is the force that attracts objects toward each other, especially toward the Earth.",
    "democracy": "Democracy is a system of government where citizens elect their leaders.",
    "newton's laws": "Newton's laws describe the relationship between motion and forces.",
    "pythagoras theorem": "Pythagoras theorem states that in a right-angled triangle: a² + b² = c²."
  };

  for (let key in knowledge) {
    if (question.includes(key)) {
      return knowledge[key];
    }
  }

  return null;
}

/* ---------------- UTIL ---------------- */

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/* ---------------- MAIN LOGIC ---------------- */

function sendMessage() {
  const input = document.getElementById("userInput");
  let text = input.value.trim();
  if (!text) return;

  const lowerText = text.toLowerCase();

  addMessage("<strong>You:</strong> " + text, "user");
  input.value = "";

  showTyping();

  setTimeout(() => {
    removeTyping();

    let response = "";

    /* ---- Remember Name ---- */
    if (lowerText.includes("my name is")) {
      userName = text.split("is")[1].trim();
      response = `Nice to meet you, ${capitalize(userName)}!`;
    }

    /* ---- Greeting ---- */
    else if (lowerText.includes("hello") || lowerText.includes("hi")) {
      response = userName
        ? `Hello ${capitalize(userName)}! How can I help you today?`
        : "Hello! I'm your Smart Student AI. What can I help you with?";
    }

    /* ---- Essay ---- */
    else if (lowerText.includes("essay on")) {
      const topic = lowerText.split("essay on")[1].trim();
      response = generateEssay(topic);
    }

    /* ---- Knowledge ---- */
    else if (getKnowledge(lowerText)) {
      response = getKnowledge(lowerText);
    }

    /* ---- Math ---- */
    else {
      try {
        const result = math.evaluate(text);
        response = `<strong>Answer:</strong> ${result}`;
      } catch (error) {
        response = "I'm still learning. Try asking a math problem, essay, or definition.";
      }
    }

    addMessage(response, "bot");

  }, 600);
}
