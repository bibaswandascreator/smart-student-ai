function addMessage(text, sender) {
  const chat = document.getElementById("chat");

  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

/* ---------------- ESSAY ---------------- */

function generateEssay(topic) {
  return `Essay on ${topic}:

${topic} is an important topic in our society. It affects people in many ways.

There are different causes and effects related to ${topic}. Understanding it helps us make better decisions.

In conclusion, ${topic} is a meaningful topic that deserves attention and awareness.`;
}

/* ---------------- KNOWLEDGE ---------------- */

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

/* ---------------- STORY SUM SOLVER ---------------- */

function solveStoryProblem(text) {
  const numbers = text.match(/\d+/g);
  if (!numbers || numbers.length < 2) return null;

  const lower = text.toLowerCase();
  const nums = numbers.map(Number);

  if (
    lower.includes("km") ||
    lower.includes("kilometer") ||
    lower.includes("hour") ||
    lower.includes("distance")
  ) {
    const distance = nums[0] * nums[1];
    return `Distance = ${nums[0]} × ${nums[1]} = ${distance}`;
  }

  if (
    lower.includes("cost") ||
    lower.includes("each") ||
    lower.includes("per") ||
    lower.includes("rupee")
  ) {
    const total = nums[0] * nums[1];
    return `Total cost = ${nums[0]} × ${nums[1]} = ${total}`;
  }

  if (
    lower.includes("total") ||
    lower.includes("together") ||
    lower.includes("altogether") ||
    lower.includes("more")
  ) {
    const sum = nums.reduce((a, b) => a + b);
    return `Total = ${sum}`;
  }

  if (
    lower.includes("left") ||
    lower.includes("remaining") ||
    lower.includes("gave") ||
    lower.includes("lost")
  ) {
    const result = nums[0] - nums[1];
    return `Remaining = ${nums[0]} - ${nums[1]} = ${result}`;
  }

  return null;
}

/* ---------------- CLEAN MATH INPUT ---------------- */

function cleanMathInput(text) {
  return text
    .replace("what is", "")
    .replace("calculate", "")
    .replace("solve", "")
    .trim();
}

/* ---------------- MAIN FUNCTION ---------------- */

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  let response = "";
  const lower = text.toLowerCase();

  try {

    if (lower.includes("essay on")) {
      const topic = lower.split("essay on")[1].trim();
      response = generateEssay(topic);
    }

    else if (getKnowledge(lower)) {
      response = getKnowledge(lower);
    }

    else if (solveStoryProblem(lower)) {
      response = solveStoryProblem(lower);
    }

    else {
      const cleaned = cleanMathInput(lower);
      const result = math.evaluate(cleaned);
      response = "Answer: " + result;
    }

  } catch (error) {
    response = "I can solve math expressions, story sums, essays, or theory questions.";
  }

  addMessage(response, "bot");
}
