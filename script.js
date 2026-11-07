// FrostMine website settings.
// Replace these values when your real Discord invite and vote pages are ready.
const FROSTMINE_CONFIG = {
  serverAddress: "frostmine.xyz",
  discordInvite: "",
  voteLinks: []
};

const $ = (id) => document.getElementById(id);
const toast = $("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}

async function copyServerAddress() {
  try {
    await navigator.clipboard.writeText(FROSTMINE_CONFIG.serverAddress);
    showToast("Server IP copied: " + FROSTMINE_CONFIG.serverAddress);
  } catch {
    showToast("Server IP: " + FROSTMINE_CONFIG.serverAddress);
  }
}

$("copyIp").addEventListener("click", copyServerAddress);
$("copyIpSmall").addEventListener("click", copyServerAddress);

const menuToggle = $("menuToggle");
const navigation = $("navigation");
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach((section) => observer.observe(section));
}

async function refreshServerStatus() {
  const indicator = $("statusIndicator");
  const statusTitle = $("serverStatus");
  const statusMessage = $("statusMessage");
  const playerCount = $("playerCount");
  indicator.className = "status-indicator";
  statusTitle.textContent = "Checking status...";
  statusMessage.textContent = "Contacting server status service";
  try {
    const response = await fetch("https://api.mcsrvstat.us/3/" + encodeURIComponent(FROSTMINE_CONFIG.serverAddress), { cache: "no-store" });
    if (!response.ok) throw new Error("Status service unavailable");
    const data = await response.json();
    if (data.online) {
      indicator.classList.add("online");
      statusTitle.textContent = "Online";
      const version = data.version ? " · " + data.version : "";
      statusMessage.textContent = "FrostMine is online and ready to play" + version;
      playerCount.textContent = data.players ? data.players.online : "0";
    } else {
      indicator.classList.add("offline");
      statusTitle.textContent = "Offline";
      statusMessage.textContent = "The server is currently unreachable";
      playerCount.textContent = "0";
    }
  } catch {
    indicator.classList.add("offline");
    statusTitle.textContent = "Status unavailable";
    statusMessage.textContent = "Could not reach the status service. Try again shortly.";
    playerCount.textContent = "—";
  }
}

$("refreshStatus").addEventListener("click", refreshServerStatus);
$("year").textContent = new Date().getFullYear();

const discordLink = $("discordLink");
if (FROSTMINE_CONFIG.discordInvite.trim()) {
  discordLink.href = FROSTMINE_CONFIG.discordInvite;
  discordLink.target = "_blank";
} else {
  discordLink.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Discord invite will be added soon.");
  });
}

const voteButton = document.querySelector(".vote-content .button");
if (FROSTMINE_CONFIG.voteLinks.length) {
  voteButton.href = FROSTMINE_CONFIG.voteLinks[0].url;
  voteButton.textContent = "Vote for FrostMine ↗";
  voteButton.target = "_blank";
  voteButton.rel = "noopener";
} else {
  voteButton.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Vote links will be added soon.");
  });
}

refreshServerStatus();
