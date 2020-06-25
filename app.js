const bookContainer = document.querySelector("#book-container");

let books = [
  { author: "J.K. Rowlings", title: "Harry Potter", pages: 500, read: true },
  { author: "Tolkien", title: "Lord of the Rings", pages: 1000, read: false },
]; //later this will initialize with contents of local storage

getBooks();

// function Book(title, author, pages, finished) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.finished = finished;
// }

// Book.prototype.info = function () {
//   const mssgToUser = this.finished ? "already read" : "not read yet";

//   return `${this.title} by ${this.author}, ${this.pages} pages, ${mssgToUser}.`;
// };

//Page loads, loop gets each book and passes obj/ind to render(),
function getBooks() {
  bookContainer.innerHTML = "";
  books.forEach((book, index) => {
    render(book, index);
  });
}

//render() will create the html using the props of each object and add the book card to a container elem
function render(book, index) {
  const div = document.createElement("div");
  div.classList.add("book");
  div.setAttribute("data-index", index);

  div.innerHTML = createHTML(book);

  //needed to add styling to btn depending of read or not
  const isReadBtn = div.querySelector("#isRead");

  if (book.read) {
    isReadBtn.classList.add("greenBtn");
  } else {
    isReadBtn.classList.add("redBtn");
  }

  bookContainer.appendChild(div);
}

//helper to create html for the book div,
function createHTML(book) {
  const read = book.read;
  const mssgToUser = read
    ? "you have read this book."
    : "you have not read this book yet.";
  const readOrUnread = read ? "read" : "unread";

  return `
  <button class="delete" id="delete">X</button>
  <p class="book-info">
    ${book.title} by ${book.author}, ${book.pages} pages long, ${mssgToUser}
  </p>
  <button class="isRead" id="isRead">${readOrUnread}</button>
  `;
}

//each card will have delete btn that will remove obj from array, resave, and render again
function deleteBook(index) {
  books = books.filter((_, bookIndex) => parseInt(index) !== bookIndex);
  getBooks();
}

function changeReadStatus(index) {
  books = books.map((book, bookIndex) => {
    if (parseInt(index) === bookIndex) {
      book.read = book.read ? false : true;
      return book;
    }
    return book;
  });
  getBooks();
}

//eventlisteners
bookContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.parentNode.dataset.index;
    const id = e.target.id;

    if (id === "delete") {
      deleteBook(index);
    } else {
      changeReadStatus(index);
    }
  }
});
