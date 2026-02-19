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

${topic} is an important topic in our society. It plays a significant role in daily life and affects many people.

There are several causes and effects related to ${topic}. Understanding this topic helps us become more aware and responsible.

In conclusion, ${topic} is something that deserves attention and thoughtful understanding.`;
}

function getKnowledge(question) {
  const knowledge = {
    "gravity": "Gravity is the force that pulls objects toward the Earth.",
    "photosynthesis": "Photosynthesis is the process by which plants make food using sunlight.",
    "democracy": "Democracy is a system of government where people elect their leaders.",
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
    .replace("=", "")
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
    // Essay detection
    if (lower.includes("essay on")) {
      const topic = lower.split("essay on")[1].trim();
      response = generateEssay(topic);
    }

    // Knowledge detection
    else if (getKnowledge(lower)) {
      response = getKnowledge(lower);
    }

    // Equation solving (simple x equations)
    else if (lower.includes("=") && lower.includes("x")) {
      const parts = lower.split("=");
      const left = parts[0];
      const right = parts[1];

      const solution = math.solve(left + "-(" + right + ")", "x");
      response = "Solution: x = " + solution;
    }

    // Normal math expression
    else {
      const cleaned = cleanMathInput(lower);
      const result = math.evaluate(cleaned);
      response = "Answer: " + result;
    }

  } catch (error) {
    response = "I can solve math, write essays, or answer simple theory questions.";
  }

  addMessage(response, "bot");
}
