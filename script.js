const modalContainer = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

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

// Validate Form 
function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if(!urlValue || !nameValue) {
    alert('Please submit values for both fields.');
    return false
  }
  if(!urlValue.match(regex)) {
    alert('Please provide a valid web address');
    return false;
  }
  return true;
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get booksmarks form localStorage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create bookamarks array in localStorage
    bookmarks = [
      {
        name: "Linkedin",
        url: "https://Linkedin.com",
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildsBookmarks()
}

// Handle Data from form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
    urlValue = `https://${urlValue}`;
  }
  
  if (!validate(nameValue, urlValue)){
    return false;
  }

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks()
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event Listerner
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();

