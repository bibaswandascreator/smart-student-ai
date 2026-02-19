function addMessage(text, sender) {
  const chat = document.getElementById("chat");

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = sender === "user" ? "flex-end" : "flex-start";

  const message = document.createElement("div");
  message.classList.add("message");
  message.textContent = text;

  wrapper.appendChild(message);
  chat.appendChild(wrapper);

  chat.scrollTop = chat.scrollHeight;
}

function generateEssay(topic) {
  return `Essay on ${topic}:

${topic} is an important topic in our society. It affects people in many ways.

There are different causes and effects related to ${topic}. Understanding it helps us make better decisions.

In conclusion, ${topic} is a meaningful topic that deserves attention and awareness.`;
}

function getKnowledge(question) {
  const knowledge = {
    "gravity": "Gravity is the force that pulls objects toward the Earth.",
    "photosynthesis": "Photosynthesis is the process by which plants make food using sunlight.",
    "democracy": "Democracy is a system of government where people elect leaders.",
    "pythagoras": "In a right triangle: a² + b² = c²."
  };

  for (let key in knowledge) {
    if (question.includes(key)) {
      return knowledge[key];
    }
  }
  return null;
}

function cleanMathInput(text) {
  return text
    .replace("what is", "")
    .replace("calculate", "")
    .replace("solve", "")
    .trim();
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  let response = "";
  const lower = text.toLowerCase();

  try {

    // Essay
    if (lower.includes("essay on")) {
      const topic = lower.split("essay on")[1].trim();
      response = generateEssay(topic);
    }

    // Knowledge
    else if (getKnowledge(lower)) {
      response = getKnowledge(lower);
    }

    // Simple math expression
    else {
      const cleaned = cleanMathInput(lower);
      const result = math.evaluate(cleaned);
      response = "Answer: " + result;
    }

  } catch (error) {
    response = "I can solve math expressions, write essays, or answer basic theory questions.";
  }

  addMessage(response, "bot");
}
