const API_URL = "https://earth.jasa-earth.workers.dev";

async function loadComments() {
  const res = await fetch(`${API_URL}?page=${encodeURIComponent(location.pathname)}`);
  const comments = await res.json();
  const container = document.getElementById("comments");
  container.innerHTML = comments.map(c =>
  `<div class="comment">
    ${c.content}
    <span class="after-text"> was here</span>
    <small class="timestamp">${new Date(c.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/New_York",
    })}</small></div>`
  ).join("");
}

async function submitComment() {
  const content = document.getElementById("comment-input").value;
  if (!content) return alert("u didnt put anything in the box goof");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ page: location.pathname, content })
  });

  document.getElementById("comment-input").value = "";
  loadComments();
}

document.getElementById("submit-comment").addEventListener("click", submitComment);

// Load comments on page load
loadComments();