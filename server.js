const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

console.log("Server.js is running...");

// === File paths ===
const moodsPath = path.join(__dirname, "moods.json");
const statusPath = path.join(__dirname, "statuses.json");
const journalPath = path.join(__dirname, "journal.json");
const chatPath = path.join(__dirname, "chat.json");
const memoryPath = path.join(__dirname, "memories.json");
const moodResponsesPath = path.join(__dirname, "moodResponses.json");

// === Load data ===
let moodData = {};
let statusData = {};
let journalData = [];
let chatData = [];
let memoryData = { Leo: {}, Isabelle: {} };
let moodResponses = {};

function loadData() {
  try {
    moodData = JSON.parse(fs.readFileSync(moodsPath, "utf-8"));
    console.log("Loaded mood data");
  } catch {}
  try {
    statusData = JSON.parse(fs.readFileSync(statusPath, "utf-8"));
    console.log("Loaded status data");
  } catch {}
  try {
    journalData = JSON.parse(fs.readFileSync(journalPath, "utf-8"));
    console.log("Loaded journal data");
  } catch {}
  try {
    chatData = JSON.parse(fs.readFileSync(chatPath, "utf-8"));
    console.log("Loaded chat data");
  } catch {}
  try {
    memoryData = JSON.parse(fs.readFileSync(memoryPath, "utf-8"));
    console.log("Loaded memory data");
  } catch {}
  try {
    moodResponses = JSON.parse(fs.readFileSync(moodResponsesPath, "utf-8"));
    console.log("Loaded mood responses");
  } catch {}
}

function saveMoodData() {
  fs.writeFileSync(moodsPath, JSON.stringify(moodData, null, 2));
}
function saveStatusData() {
  fs.writeFileSync(statusPath, JSON.stringify(statusData, null, 2));
}
function saveJournalData() {
  fs.writeFileSync(journalPath, JSON.stringify(journalData, null, 2));
}
function saveChatData() {
  fs.writeFileSync(chatPath, JSON.stringify(chatData, null, 2));
}
function saveMemoryData() {
  fs.writeFileSync(memoryPath, JSON.stringify(memoryData, null, 2));
}
function saveMoodResponses() {
  fs.writeFileSync(moodResponsesPath, JSON.stringify(moodResponses, null, 2));
}

loadData();

// === Serve homepage ===
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// === Mood endpoints ===
app.get("/mood/:user", (req, res) => {
  const user = req.params.user;
  res.send(moodData[user] || {});
});

app.post("/mood", (req, res) => {
  const { user, mood, timestamp } = req.body;
  if (!user || !timestamp) return res.status(400).send("Missing fields");
  moodData[user] = { mood, timestamp };
  saveMoodData();
  res.send({ success: true });
});

// === Mood response ===
app.get("/moodResponse/:user", (req, res) => {
  res.send(moodResponses[req.params.user] || {});
});

app.post("/moodResponse", (req, res) => {
  const { user, from, timestamp, memory } = req.body;
  if (!user || !from || !timestamp) return res.status(400).send("Missing fields");
  moodResponses[user] = { from, timestamp, memory };
  saveMoodResponses();
  res.send({ success: true });
});

// === Status endpoints ===
app.get("/status/:user", (req, res) => {
  res.send(statusData[req.params.user] || {});
});

app.post("/status", (req, res) => {
  const { user, key, value, timestamp } = req.body;
  if (!user || !key || !timestamp) return res.status(400).send("Missing fields");
  if (!statusData[user]) statusData[user] = {};
  statusData[user][key] = { value, timestamp };
  saveStatusData();
  res.send({ success: true });
});

// === Journal ===
app.get("/journal", (req, res) => {
  res.send(journalData);
});

app.post("/journal", (req, res) => {
  const { user, text, timestamp, title } = req.body;
  if (!user || !text || !timestamp) return res.status(400).send("Missing fields");
  journalData.push({ user, text, timestamp, title });
  saveJournalData();
  res.send({ success: true });
});

// === Chat ===
app.get("/chat", (req, res) => {
  res.send(chatData);
});

app.post("/chat", (req, res) => {
  const body = req.body;
  if (Array.isArray(body)) {
    chatData = body;
    saveChatData();
  } else {
    const { user, text, timestamp, duck, image } = body;
    if (!user || !text || !timestamp) return res.status(400).send("Missing fields");
    chatData.push({ user, text, timestamp, duck, image });
    saveChatData();
  }
  res.send({ success: true });
});

// === Carousel memories ===
app.get("/memories/:user", (req, res) => {
  res.send(memoryData[req.params.user] || {});
});

app.post("/memories", (req, res) => {
  const { user, roomKey, memory, data } = req.body;
  if (!user) return res.status(400).send("Missing user");

  if (!memoryData[user]) memoryData[user] = {};

  if (data) {
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

// === Reset user ===
app.post("/reset/:user", (req, res) => {
  const user = req.params.user;

  delete moodData[user];
  delete statusData[user];
  delete moodResponses[user];
  delete memoryData[user];

  saveMoodData();
  saveStatusData();
  saveMoodResponses();
  saveMemoryData();

  res.send({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
