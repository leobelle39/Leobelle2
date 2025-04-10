// === Setup & Storage ===
let currentUser = localStorage.getItem("currentUser") || "";
let moods = JSON.parse(localStorage.getItem("moods")) || {
  Leo: {},
  Isabelle: {},
};
let moodResponses = JSON.parse(localStorage.getItem("moodResponses")) || {};
let chatMessages = [];
let journalEntries = [];
let carouselMemories = JSON.parse(localStorage.getItem("carouselMemories")) || {
  Leo: {},
  Isabelle: {},
};
let statusTimestamps = JSON.parse(localStorage.getItem("statusTimestamps")) || {
  Leo: {},
  Isabelle: {}
};
const backendBase = "https://leobelle-backend.glitch.me";

// === Room Images ===
const leoRooms = [
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_31_1.jpg?v=1744161614267",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_30_1.jpg?v=1744161612272",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_15_1.jpg?v=1744161577291",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_11_1.jpg?v=1744161569713",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_14_1.jpg?v=1744161573804",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_7_1.jpg?v=1744161561138",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_9_1.jpg?v=1744161564190",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_5_1.jpg?v=1744161555454",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_4_1.jpg?v=1744161551070",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_20_1.jpg?v=1744161587322",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_25_1.jpg?v=1744161595351",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_22_1.jpg?v=1744161592128",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_21_1.jpg?v=1744161590383",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/72886476_28_1.jpg?v=1744161606449",
];
const izRooms = [
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/iz1?v=1744161657812",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/56f709e820ffbbb4215ce5599a0bb620-uncropped_scaled_within_1536_1152.webp?v=1744161659984",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/e88fa9f4fb4def3f14069143706a4a97-uncropped_scaled_within_1536_1152.webp?v=1744161666444",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/89284f29f67c3bcd5c95f402a380fa86-cc_ft_1536.webp?v=1744161617549",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/c8fe2dd72d52662a433943e8563fc3ad-uncropped_scaled_within_1536_1152.webp?v=1744161621312",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/bebceea803862d2fc50472751e7fcd22-uncropped_scaled_within_1536_1152.webp?v=1744161622653",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/0eff0b4a741fe8301ee7287fbc6ebcdf-uncropped_scaled_within_1536_1152.webp?v=1744161624912",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/366a5108da9dd4d827bf5ed8824672e0-uncropped_scaled_within_1536_1152.webp?v=1744161626284",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/d439da931cc8fd2da040d923a840a7e0-uncropped_scaled_within_1536_1152.webp?v=1744161635535",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/e5523881babb26fa8ca87cb9666a70ae-uncropped_scaled_within_1536_1152.webp?v=1744161629573",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/32271f39e2f7db712f561946064515ac-uncropped_scaled_within_1536_1152.webp?v=1744161641814",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/e405921dd8920360a8a86b0caa6180f2-uncropped_scaled_within_1536_1152.webp?v=1744161643481",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/66f7639eeeb0d0adc544e68fae040d88-uncropped_scaled_within_1536_1152.webp?v=1744161646092",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/3b769995cc2126227e2ce3f1e8874eb4-uncropped_scaled_within_1536_1152.webp?v=1744161638544",
  "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/4491df35f8181580640e486895f2fc9c-uncropped_scaled_within_1536_1152.webp?v=1744161632134",
];

function emojiForMood(mood) {
  const map = {
    Happy: "😊",
    Sad: "😢",
    Anxious: "😰",
    Tired: "🥱",
    Confused: "❓",
    Lonely: "💜",
    "Cloud 9": "☁️",
    Spontaneous: "⚡",
    Goofy: "🤪",
    Cautious: "🧐",
    Empty: "🕳️",
    Dissociative: "🚪",
    Angry: "🔥",
    Excited: "🎉",
    Frustrated: "😤",
    Annoyed: "😒",
    Restless: "🏃‍♂️",
    Content: "🌿",
  };
  return map[mood] || "";
}

let currentRoomIndex = 0;
let activeHome = "Leo";

// === User Selection ===
function setUser(name) {
  currentUser = name;
  localStorage.setItem("currentUser", name);

  document.getElementById("btn-leo").classList.remove("selected");
  document.getElementById("btn-iz").classList.remove("selected");
  document
    .getElementById(name === "Leo" ? "btn-leo" : "btn-iz")
    .classList.add("selected");

  document.body.classList.remove("leo-theme", "isabelle-theme");
  document.body.classList.add(name === "Leo" ? "leo-theme" : "isabelle-theme");

  renderMoodDisplay();
  renderChat();
  renderJournal();
  updateSynergyBar();
  applyStoredStatuses();

  syncMoodsFromBackend();
  syncStatusesFromBackend();
  syncMoodResponsesFromBackend();
  fetchChatMessages();
  fetchJournalEntries();
}
function updateStatus(id, value) {
  if (!currentUser) return;
  const timestamp = new Date().toLocaleString();

  if (!statusTimestamps[currentUser]) statusTimestamps[currentUser] = {};
statusTimestamps[currentUser][id] = { value, timestamp };
  localStorage.setItem("statusTimestamps", JSON.stringify(statusTimestamps));
  document.getElementById(id + "Time").innerText = timestamp;
  updateSynergyBar();

  fetch(`${backendBase}/status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: currentUser, key: id, value, timestamp }),
  });
}

async function syncStatusesFromBackend() {
  try {
    const users = ["Leo", "Isabelle"];
    for (let user of users) {
      const res = await fetch(`${backendBase}/status/${user}`);
      const data = await res.json();

      if (!statusTimestamps[user]) statusTimestamps[user] = {};

      for (let key in data) {
        const item = data[key];
        const prevItem = statusTimestamps[user][key];

        const timestampChanged = !prevItem || prevItem.timestamp !== item.timestamp;
        const valueChanged = !prevItem || prevItem.value !== item.value;

        if (timestampChanged || valueChanged) {
          statusTimestamps[user][key] = item;

          const timeEl = document.getElementById(key + "Time");
          if (timeEl) timeEl.innerText = item.timestamp;

          const selectEl = document.getElementById(key);
          if (
            selectEl &&
            document.activeElement !== selectEl &&
            selectEl.value !== item.value &&
            document.hasFocus()
          ) {
            selectEl.value = item.value;
          }
        }
      }

      localStorage.setItem("statusTimestamps", JSON.stringify(statusTimestamps));
    }

    updateSynergyBar();
  } catch (err) {
    console.warn("Status sync failed:", err.message);
  }
}

async function syncMoodsFromBackend() {
  try {
    const users = ["Leo", "Isabelle"];
    for (let user of users) {
      const res = await fetch(`${backendBase}/mood/${user}`);
      const data = await res.json();
      if (data.mood) moods[user] = data;
    }
    renderMoodDisplay();
  } catch (err) {
    console.warn("Mood sync failed:", err.message);
  }
}
async function syncMoodResponsesFromBackend() {
  try {
    const users = ["Leo", "Isabelle"];
    for (let user of users) {
      const res = await fetch(`${backendBase}/moodResponse/${user}`);
      if (!res.ok) continue;
      const data = await res.json();
      if (data && data.from) {
        moodResponses[user] = data;
      }
    }
    renderMoodDisplay();
  } catch (err) {
    console.warn("Mood response sync failed:", err.message);
  }
}
async function syncMemoriesFromBackend() {
  try {
    const res = await fetch(`${backendBase}/memories/${currentUser}`);
    const data = await res.json();
    carouselMemories[currentUser] = data;
    localStorage.setItem("carouselMemories", JSON.stringify(carouselMemories));
  } catch (err) {
    console.warn("Memory sync failed:", err.message);
  }
}

function submitMood() {
  const mood = document.getElementById("mood-select").value;
  if (!currentUser || !mood) return;

  const now = new Date().toLocaleString();
  moods[currentUser] = { mood, timestamp: now };
  localStorage.setItem("moods", JSON.stringify(moods));

  const all = JSON.parse(localStorage.getItem("allMoodHistory")) || [];
  all.push({ user: currentUser, mood, timestamp: now });
  localStorage.setItem("allMoodHistory", JSON.stringify(all));

  fetch(`${backendBase}/mood`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: currentUser, mood, timestamp: now }),
  }).then(() => renderMoodDisplay());
}
function resetMood() {
  if (!currentUser) return;
  moods[currentUser] = {};
  localStorage.setItem("moods", JSON.stringify(moods));
  fetch(`${backendBase}/mood`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: currentUser, mood: "", timestamp: "" }),
  }).then(() => renderMoodDisplay());
}
function viewMoodHistory() {
  const all = JSON.parse(localStorage.getItem("allMoodHistory")) || [];
  const userEntries = all.filter((entry) => entry.user === currentUser);

  if (userEntries.length === 0) {
    alert("No mood history found.");
    return;
  }

  const moodCounts = {};
  userEntries.forEach((entry) => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });

  const total = userEntries.length;
  const lines = Object.entries(moodCounts).map(
    ([mood, count]) => `${mood}: ${Math.round((count / total) * 100)}%`
  );

  alert(`${currentUser} Mood Breakdown:\n\n` + lines.join("\n"));
}

function handleMoodResponse(targetUser) {
  const responderHome = currentUser;
  const response = {
    from: currentUser,
    timestamp: new Date().toLocaleString(),
    memory: null, // We'll add memory object if used
  };
  moodResponses[targetUser] = response;
  localStorage.setItem("moodResponses", JSON.stringify(moodResponses));

  fetch(`${backendBase}/moodResponse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: targetUser,
      from: response.from,
      timestamp: response.timestamp,
      memory: response.memory,
    }),
  });

  openHome(responderHome);
  renderMoodDisplay();
}

function nextRoom() {
  const rooms = activeHome === "Leo" ? leoRooms : izRooms;
  currentRoomIndex = (currentRoomIndex + 1) % rooms.length;
  updateCarouselRoom(rooms);
}

function prevRoom() {
  const rooms = activeHome === "Leo" ? leoRooms : izRooms;
  currentRoomIndex = (currentRoomIndex - 1 + rooms.length) % rooms.length;
  updateCarouselRoom(rooms);
}

function updateCarouselRoom(rooms) {
  const image = document.getElementById("carousel-image");
  image.src = rooms[currentRoomIndex];
  document.getElementById("room-label").innerText = `Room ${
    currentRoomIndex + 1
  } of ${rooms.length}`;
  loadMemoryIcons();
}

function closeCarousel() {
  localStorage.setItem("carouselMemories", JSON.stringify(carouselMemories));
  fetch(`${backendBase}/memories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: currentUser,
      data: carouselMemories[currentUser],
    }),
  });
  document.getElementById("carousel-container").style.display = "none";
}

function showHelpModal() {
  document.getElementById("carousel-modal").style.display = "block";
  document.getElementById(
    "carousel-modal-text"
  ).innerText = `Welcome to ${activeHome}’s childhood home.\n\nTap anywhere in the room to add a memory.\nSwipe left or right to change rooms.\nTap a Pooh icon to view the memory.\nTap the memory text to hide it again.\nUse ‘Save & Exit’ when done.`;
}

function nextModalStep() {
  document.getElementById("carousel-modal").style.display = "none";
}

// === Memory Placement ===
document.getElementById("carousel-image").onclick = function (e) {
  const container = document.getElementById("carousel-image-container");
  const icon = document.createElement("img");
  icon.src =
    "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/IMG_4814.GIF?v=1744162305190";
  icon.className = "memory-icon";
  const x = e.offsetX;
  const y = e.offsetY;
  icon.style.left = x + "px";
  icon.style.top = y + "px";

  const text = prompt("Describe your memory.");
  if (!text) return;

  const roomKey = `room${currentRoomIndex}`;
  if (!carouselMemories[activeHome][roomKey])
    carouselMemories[activeHome][roomKey] = [];
  const memory = { x, y, text };
  carouselMemories[activeHome][roomKey].push(memory);

  fetch(`${backendBase}/memories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: activeHome, roomKey, memory }),
  });
  const popup = document.createElement("div");
  popup.className = "memory-popup";
  popup.innerText = text;
  popup.style.left = x + "px";
  popup.style.top = y + "px";
  popup.style.display = "none";

  icon.onclick = () => {
    popup.style.display = popup.style.display === "none" ? "block" : "none";
  };

  container.appendChild(icon);
  container.appendChild(popup);
};

function loadMemoryIcons() {
  const container = document.getElementById("carousel-image-container");
  container
    .querySelectorAll(".memory-icon, .memory-popup")
    .forEach((el) => el.remove());

  const roomKey = `room${currentRoomIndex}`;
  const entries = carouselMemories[activeHome][roomKey] || [];

  for (let { x, y, text } of entries) {
    const icon = document.createElement("img");
    icon.src =
      "https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/IMG_4814.GIF?v=1744162305190";
    icon.className = "memory-icon";
    icon.style.left = x + "px";
    icon.style.top = y + "px";

    const popup = document.createElement("div");
    popup.className = "memory-popup";
    popup.innerText = text;
    popup.style.left = x + "px";
    popup.style.top = y + "px";
    popup.style.display = "none";

    icon.onclick = () => {
      popup.style.display = popup.style.display === "none" ? "block" : "none";
    };

    container.appendChild(icon);
    container.appendChild(popup);
  }
}

// === Carousel: Let’s Go Home ===
function openHome(user) {
  activeHome = user;
  currentRoomIndex = 0;
  const rooms = user === "Leo" ? leoRooms : izRooms;
  document.getElementById("carousel-image").src = rooms[currentRoomIndex];
  document.getElementById("home-name").innerText = user + "’s";
  document.getElementById("carousel-container").style.display = "block";
  document.getElementById("room-label").innerText = `Room ${
    currentRoomIndex + 1
  } of ${rooms.length}`;
  loadMemoryIcons();
}
function showCarouselModal() {
  document.getElementById("carousel-modal").style.display = "block";
}

function renderMoodDisplay() {
  const leo = moods.Leo || {};
  const iz = moods.Isabelle || {};
  const leoBox = document.getElementById("leo-mood");
  const izBox = document.getElementById("isabelle-mood");

  leoBox.innerHTML = leo.mood
    ? `<strong>${emojiForMood(leo.mood)} ${leo.mood}</strong><br><small>${
        leo.timestamp
      }</small>`
    : "--";
  izBox.innerHTML = iz.mood
    ? `<strong>${emojiForMood(iz.mood)} ${iz.mood}</strong><br><small>${
        iz.timestamp
      }</small>`
    : "--";

  document.getElementById("leo-response-note").innerHTML = "";
  document.getElementById("iz-response-note").innerHTML = "";

  if (currentUser === "Leo" && iz.mood) {
    izBox.innerHTML += `
      <div class="row-inline" style="margin-top: 6px;">
        <button class="mini-btn" onclick="window.location.href='tel:6174879914'">Call Her</button>
        <button class="mini-btn" onclick="handleMoodResponse('Isabelle')">Let’s Go Home</button>
      </div>
    `;
  }

  if (currentUser === "Isabelle" && leo.mood) {
    leoBox.innerHTML += `
      <div class="row-inline" style="margin-top: 6px;">
        <button class="mini-btn" onclick="window.location.href='tel:5088873007'">Call Him</button>
        <button class="mini-btn" onclick="handleMoodResponse('Leo')">Let’s Go Home</button>
      </div>
    `;
  }
}

// === Chat ===
function fetchChatMessages() {
  fetch(`${backendBase}/chat`)
    .then((res) => res.json())
    .then((data) => {
      chatMessages = data;
      renderChat();
    });
}

function sendMessage(isDuck = false) {
  if (!currentUser) return;
  let text = document.getElementById("chat-input").value.trim();
  const imageInput = document.getElementById("chat-image");
  const file = imageInput.files[0];

  if (isDuck) {
    const reason = prompt("What made you think of them? (optional)");
    if (reason !== null) {
      text = `${currentUser} thought of you! Derpy duck deployed${
        reason ? ` because ${reason}` : ""
      }.`;
    } else return;
  }

  const timestamp = new Date().toLocaleString();
  const msg = { user: currentUser, text, duck: isDuck, timestamp };

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      msg.image = reader.result;
      sendChatToBackend(msg);
    };
    reader.readAsDataURL(file);
  } else {
    sendChatToBackend(msg);
  }
}

function sendChatToBackend(msg) {
  fetch(`${backendBase}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(msg),
  }).then(() => {
    document.getElementById("chat-input").value = "";
    document.getElementById("chat-image").value = "";
    fetchChatMessages();
  });
}

function renderChat() {
  const feed = document.getElementById("chat-feed");
  feed.innerHTML = "";
  [...chatMessages].reverse().forEach((msg, index) => {
    const div = document.createElement("div");
    div.className = "chat-entry";
    div.innerHTML = `
      <div class="chat-meta">${msg.user} — ${msg.timestamp}</div>
      <div class="chat-text">${msg.text}</div>
      ${msg.image ? `<img src="${msg.image}" class="chat-image-preview" />` : ""}
      ${msg.duck ? `<img src="https://cdn.glitch.global/bb10cd26-538e-4b34-b703-4f32211a93f8/duck.gif?v=1744147934666" class="chat-duck-gif" />` : ""}
      <div class="chat-actions" style="display: none;">
        <button onclick="editChat(${chatMessages.length - 1 - index})">Edit</button>
        <button onclick="deleteChat(${chatMessages.length - 1 - index})">Delete</button>
      </div>
    `;
    div.onclick = () => {
      const actions = div.querySelector(".chat-actions");
      actions.style.display = actions.style.display === "none" ? "block" : "none";
    };
    feed.appendChild(div);
  });
}
// === Journal ===
function fetchJournalEntries() {
  fetch(`${backendBase}/journal`)
    .then((res) => res.json())
    .then((data) => {
      journalEntries = data;
      renderJournal();
    });
}

function sendJournalEntry() {
  if (!currentUser) return;
  const text = document.getElementById("journal-input").value.trim();
  if (!text) return;

  const title = prompt("Enter a title for this journal entry:");
  if (!title) return;

  const timestamp = new Date().toLocaleString();

  fetch(`${backendBase}/journal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: currentUser, text, timestamp, title }),
  }).then(() => {
    document.getElementById("journal-input").value = "";
    document.getElementById("journal-input").blur(); // prevents scroll snapping back
    fetchJournalEntries();
  });
}

function renderJournal() {
  const feed = document.getElementById("journal-feed");
  feed.innerHTML = "";feed.scrollTop = 0;
  [...journalEntries].reverse().forEach((entry) => {
    const div = document.createElement("div");
    div.className = "journal-entry";
    div.innerHTML = `
      <div class="journal-meta"><strong>${entry.user}</strong> — <strong>${entry.timestamp}</strong></div>
      <div class="journal-title"><strong>${entry.title || "Untitled"}</strong></div>
      <div class="journal-text">${entry.text}</div>
    `;
    feed.appendChild(div);
  });
}

function editChat(index) {
  const msg = chatMessages[index];
  const newText = prompt("Edit your message:", msg.text);
  if (newText === null || newText.trim() === "") return;
  chatMessages[index].text = newText;
  updateChatStorage();
  renderChat();
}

function deleteChat(index) {
  if (!confirm("Delete this message?")) return;
  chatMessages.splice(index, 1);
  updateChatStorage();
  renderChat();
}

function updateChatStorage() {
  fetch(`${backendBase}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chatMessages),
  });
}

function editJournal(index) {
  const entry = journalEntries[index];
  const newText = prompt("Edit your journal entry:", entry.text);
  if (newText === null || newText.trim() === "") return;
  journalEntries[index].text = newText;
  updateJournalStorage();
  renderJournal();
}

function deleteJournal(index) {
  if (!confirm("Delete this journal entry?")) return;
  journalEntries.splice(index, 1);
  updateJournalStorage();
  renderJournal();
}

function updateJournalStorage() {
  fetch(`${backendBase}/journal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(journalEntries),
  });
}

// === Synergy Meter ===
function updateSynergyBar() {
  let matchCount = 0;

  const leoHeart = statusTimestamps["Leo"]?.leoHeart?.value || "";
  const izHeart = statusTimestamps["Isabelle"]?.izHeart?.value || "";
  const leoPerf = statusTimestamps["Leo"]?.leoPerf?.value || "";
  const izPerf = statusTimestamps["Isabelle"]?.izPerf?.value || "";
  const leoHappy = statusTimestamps["Leo"]?.leoHappy?.value || "";
  const izHappy = statusTimestamps["Isabelle"]?.izHappy?.value || "";

  if (leoHeart === izHeart && leoHeart) matchCount++;
  if (leoPerf === izPerf && leoPerf) matchCount++;
  if (leoHappy === izHappy && leoHappy) matchCount++;

  const percentage = (matchCount / 3) * 100;
  document.getElementById("synergy-bar-fill").style.width = percentage + "%";
}

function applyStoredStatuses() {
  const userData = statusTimestamps[currentUser] || {};
  for (let key in userData) {
    const select = document.getElementById(key);
    const time = document.getElementById(key + "Time");
    if (select) select.value = userData[key].value;
    if (time) time.innerText = userData[key].timestamp;
  }
}

function resetAllData() {
  if (!confirm("Are you sure you want to reset everything for this user?")) return;

  // Clear localStorage only for this user
  if (currentUser) {
    moods[currentUser] = {};
    moodResponses[currentUser] = {};
    carouselMemories[currentUser] = {};
    statusTimestamps[currentUser] = {};
    localStorage.setItem("moods", JSON.stringify(moods));
    localStorage.setItem("moodResponses", JSON.stringify(moodResponses));
    localStorage.setItem("carouselMemories", JSON.stringify(carouselMemories));
    localStorage.setItem("statusTimestamps", JSON.stringify(statusTimestamps));
  }

  // Call backend to clear all server data for this user
  fetch(`${backendBase}/reset/${currentUser}`, {
    method: "POST",
  }).then(() => location.reload());
}

// === Load on DOM Ready ===
document.addEventListener("DOMContentLoaded", () => {
  const btnLeo = document.getElementById("btn-leo");
  const btnIz = document.getElementById("btn-iz");

  btnLeo.addEventListener("click", () => setUser("Leo"));
  btnIz.addEventListener("click", () => setUser("Isabelle"));

  document.getElementById("chat-send").onclick = () => sendMessage(false);
  document.getElementById("duck-send").onclick = () => sendMessage(true);
  document.getElementById("journal-send").onclick = sendJournalEntry;
  document.getElementById("image-send").addEventListener("click", () => {
    const input = document.getElementById("chat-image");
    if (input) input.click();
  });
  document.getElementById("chat-image").addEventListener("change", function () {
    const file = this.files[0];
    if (!file || !currentUser) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Image = e.target.result;
      const timestamp = new Date().toLocaleString();
      const msg = {
        user: currentUser,
        text: "(image)",
        image: base64Image,
        timestamp,
      };

      fetch(`${backendBase}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      }).then(() => {
        fetchChatMessages();
      });
    };
    reader.readAsDataURL(file);
  });

  currentUser = localStorage.getItem("currentUser") || "";
  if (currentUser) setUser(currentUser);

  setInterval(() => {
    if (currentUser) {
      syncStatusesFromBackend();
      syncMoodsFromBackend();
      syncMoodResponsesFromBackend();
      syncMemoriesFromBackend();
      fetchChatMessages();
      fetchJournalEntries();
    }
  }, 3000);
});
