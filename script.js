const modalContainer = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

// Show Modal
function showModal() {
  modalContainer.classList.add('show-modal');
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener("click", () => modalContainer.classList.remove('show-modal'));

window.addEventListener('click', (e) => {
  e.target == modalContainer ? modalContainer.classList.remove('show-modal') : false
});

