const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const moodResponsesPath = path.join(__dirname, "moodResponses.json");

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
console.log("Server.js is running...");

// Load existing data or initialize empty
let moodData = {};
let statusData = {};
let journalData = [];
let chatData = [];
let moodResponses = {}; // Store responses like: { Leo: { from: "Isabelle", timestamp: "...", memory: { ... } } }

let memoryData = { Leo: {}, Isabelle: {} };
const memoryPath = path.join(__dirname, "memories.json");

try {
  memoryData = JSON.parse(fs.readFileSync(memoryPath, "utf-8"));
  console.log("Loaded memory data");
} catch (err) {
  console.log("No memory file found, starting fresh.");
}

function saveMemoryData() {
  fs.writeFileSync(memoryPath, JSON.stringify(memoryData, null, 2));
}

const moodsPath = path.join(__dirname, "moods.json");
const statusPath = path.join(__dirname, "statuses.json");

// Load data on startup
try {
  moodData = JSON.parse(fs.readFileSync(moodsPath, "utf-8"));
  console.log("Loaded mood data");
} catch (err) {
  console.log("No mood file found, starting fresh.");
}

try {
  statusData = JSON.parse(fs.readFileSync(statusPath, "utf-8"));
  console.log("Loaded status data");
} catch (err) {
  console.log("No status file found, starting fresh.");
}

try {
  moodResponses = JSON.parse(fs.readFileSync(moodResponsesPath, "utf-8"));
  console.log("Loaded mood responses");
} catch (err) {
  console.log("No mood response file found, starting fresh.");
}

// Save functions
function saveMoodData() {
  fs.writeFileSync(moodsPath, JSON.stringify(moodData, null, 2));
}
function saveStatusData() {
  fs.writeFileSync(statusPath, JSON.stringify(statusData, null, 2));
}
function saveMoodResponses() {
  fs.writeFileSync(moodResponsesPath, JSON.stringify(moodResponses, null, 2));
}

// Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// === Mood Endpoints ===
app.get("/mood/:user", (req, res) => {
  const user = req.params.user;
  res.send(moodData[user] || {});
});


app.post("/mood", (req, res) => {
  const { user, mood, timestamp } = req.body;
  if (!user || !mood || !timestamp) return res.status(400).send("Missing fields");
  moodData[user] = { mood, timestamp };
  saveMoodData();
  res.send({ success: true });
});

// === Mood Response Endpoints ===
app.get("/moodResponse/:user", (req, res) => {
  const user = req.params.user;
  res.send(moodResponses[user] || {});
});

app.post("/moodResponse", (req, res) => {
  const { user, from, timestamp, memory } = req.body;
  if (!user || !from || !timestamp) {
    return res.status(400).send("Missing fields");
  }

  moodResponses[user] = { from, timestamp, memory };
  saveMoodResponses();
  res.send({ success: true });
});

// === Status Endpoints ===
app.get("/status/:user", (req, res) => {
  const user = req.params.user;
  res.send(statusData[user] || {});
});

app.post("/status", (req, res) => {
  const { user, key, value, timestamp } = req.body;
  if (!user || !key || !value || !timestamp) return res.status(400).send("Missing fields");
  if (!statusData[user]) statusData[user] = {};
  statusData[user][key] = { value, timestamp };
  saveStatusData();
  res.send({ success: true });
});

// === Journal Endpoints ===
app.get("/journal", (req, res) => {
  res.send(journalData);
});

app.post("/journal", (req, res) => {
  const { user, text, timestamp, title } = req.body;
  if (!user || !text || !timestamp) return res.status(400).send("Missing fields");
  journalData.push({ user, text, timestamp, title });
  res.send({ success: true });
});

// === Chat Endpoints ===
app.get("/chat", (req, res) => {
  res.send(chatData);
});

// === Carousel Memories Endpoints ===
app.get("/memories/:user", (req, res) => {
  const user = req.params.user;
  res.send(memoryData[user] || {});
});

app.post("/memories", (req, res) => {
  const { user, roomKey, memory, data } = req.body;
  if (!user) return res.status(400).send("Missing user");

  if (!memoryData[user]) memoryData[user] = {};

  if (data) {
    // Full replacement (from closing carousel)
    memoryData[user] = data;
  } else if (roomKey && memory) {
    if (!memoryData[user][roomKey]) memoryData[user][roomKey] = [];
    memoryData[user][roomKey].push(memory);
  } else {
    return res.status(400).send("Missing fields");
  }

  saveMemoryData();
  res.send({ success: true });
});

app.post("/chat", (req, res) => {
  const body = req.body;
  if (Array.isArray(body)) {
    chatData = body;
  } else {
    const { user, text, timestamp, duck, image } = body;
    if (!user || !text || !timestamp) return res.status(400).send("Missing fields");
    chatData.push({ user, text, timestamp, duck, image });
  }
  res.send({ success: true });
});

app.post("/reset/:user", (req, res) => {
  const user = req.params.user;

  // Delete mood
  delete moodData[user];
  saveMoodData();

  // Delete status
  delete statusData[user];
  saveStatusData();

  // Delete mood response
  delete moodResponses[user];
  if (typeof saveMoodResponses === "function") saveMoodResponses();

  // Delete memories
  delete memoryData[user];
  if (typeof saveMemoryData === "function") saveMemoryData();

  res.send({ success: true });
});

// === Start Server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));