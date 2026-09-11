// ---- EDIT THIS: your GitHub username ----
const GITHUB_USERNAME = "deysher";
const MAX_REPOS = 6;
// ------------------------------------------

document.getElementById("gh-user-label").textContent = `github.com/${GITHUB_USERNAME}`;

// clock in the status bar
const clockEl = document.getElementById("clock");
function tickClock() {
  clockEl.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
tickClock();
setInterval(tickClock, 1000 * 30);

// build stamp in the footer
document.getElementById("build-stamp").textContent =
  `last deployed ${new Date().toISOString().slice(0, 10)}`;

// ---- one-time boot sequence in the hero ----
const bootLines = [
  "> initializing profile...",
  "> loading stack: node · express · prisma · postgres",
  "> connecting to github...",
  "> ready."
];
const bootEl = document.getElementById("boot");

function typeBoot(lines, lineDelay = 420, charDelay = 14) {
  if (!bootEl) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    bootEl.textContent = lines.join("\n");
    return;
  }
  let li = 0;
  function nextLine() {
    if (li >= lines.length) return;
    const line = lines[li];
    let ci = 0;
    bootEl.textContent += (li > 0 ? "\n" : "");
    function typeChar() {
      if (ci < line.length) {
        bootEl.textContent += line[ci];
        ci++;
        setTimeout(typeChar, charDelay);
      } else {
        li++;
        setTimeout(nextLine, lineDelay);
      }
    }
    typeChar();
  }
  nextLine();
}
typeBoot(bootLines);

// ---- live project list from the GitHub REST API (no auth needed) ----
const listEl = document.getElementById("projects-list");
const statusEl = document.getElementById("projects-status");

async function loadProjects() {
  if (!listEl || !statusEl) return;
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
    const repos = await res.json();

    const filtered = repos
      .filter(r => !r.fork && !r.archived)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, MAX_REPOS);

    if (filtered.length === 0) {
      statusEl.textContent = "> no public repositories found.";
      return;
    }

    statusEl.remove();
    listEl.innerHTML = filtered.map(repoToHTML).join("");
  } catch (err) {
    statusEl.textContent = `> couldn't reach GitHub (${err.message}). Check back shortly.`;
  }
}

function repoToHTML(repo) {
  const updated = new Date(repo.pushed_at).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric"
  });
  const desc = repo.description ? escapeHTML(repo.description) : "No description yet.";
  return `
    <li class="project">
      <div class="project__row">
        <a class="project__name" href="${repo.html_url}" target="_blank" rel="noopener">${escapeHTML(repo.name)}</a>
        <span class="project__meta">updated ${updated} · ★ ${repo.stargazers_count}</span>
      </div>
      <p class="project__desc">${desc}</p>
      ${repo.language ? `<span class="project__lang">${escapeHTML(repo.language)}</span>` : ""}
    </li>
  `;
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

loadProjects();
