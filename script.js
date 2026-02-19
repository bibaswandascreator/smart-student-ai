let userName = "";

function addMessage(text, sender) {
  const chat = document.getElementById("chat");
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerHTML = text;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

function generateEssay(topic) {
  return `
    <b>Essay on ${topic}</b><br><br>
    ${topic} is an important subject in today’s world. It affects society in many ways.
    Understanding ${topic} helps us become more aware and responsible individuals.<br><br>
    There are many causes and effects related to ${topic}. It influences people,
    communities, and the environment in different ways.<br><br>
    In conclusion, ${topic} is a significant topic that should be studied carefully.
    Awareness and proper action can help improve the situation.
  `;
}

function handleKnowledge(question) {
  const knowledge = {
    "photosynthesis": "Photosynthesis is the process by which green plants make food using sunlight, carbon dioxide, and water.",
    "gravity": "Gravity is the force that attracts objects toward each other, especially toward the center of the Earth.",
    "democracy": "Democracy is a system of government where people have the power to vote and choose their leaders."
  };

  for (let key in knowledge) {
    if (question.includes(key)) {
      return knowledge[key];
    }
  }

  return null;
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.toLowerCase();
  if (!text) return;

  addMessage("<b>You:</b> " + text, "user");

  let response = "";

  // Remember name
  if (text.includes("my name is")) {
    userName = text.replace("my name is", "").trim();
    response = "Nice to meet you, " + userName + "!";
  }

  // Greeting
  else if (text.includes("hello") || text.includes("hi")) {
    response = userName ? "Hello " + userName + "!" : "Hello! What can I help you with?";
  }

  // Essay detection
  else if (text.includes("essay on")) {
    const topic = text.split("essay on")[1].trim();
    response = generateEssay(topic);
  }

  // Knowledge detection
  else if (handleKnowledge(text)) {
    response = handleKnowledge(text);
  }

  // Math solving
  else {
    try {
      const result = math.evaluate(text);
      response = "Answer: " + result;
    } catch (error) {
      response = "I’m still learning. Please ask a math question, essay, or definition.";
    }
  }

  addMessage("<b>Bot:</b> " + response, "bot");
  input.value = "";
}
