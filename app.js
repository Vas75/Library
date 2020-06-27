const bookContainer = document.querySelector("#book-container");
const addBookBtn = document.querySelector("#add-btn");
const formModal = document.querySelector("#form-modal");
const form = document.querySelector("form");
const closeFormBtn = document.querySelector("#close-form");

let books = []; //later this will initialize with contents of local storage

getBooks();

function Book(title, author, pages, finished) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.finished = finished;
}

Book.prototype.info = function () {
  const mssgToUser = this.finished ? "already read" : "not read yet";

  return `${this.title} by ${this.author}, ${this.pages} pages, ${mssgToUser}.`;
};

//iife to create/add dummy books for app on page load
(function addPlaceholderBooks() {
  const harryPotter = new Book(
    "Harry Potter and the Philosopher's Stone",
    "J.K. Rowling",
    336,
    true
  );
  const lotor = new Book(
    "The Lord of the Rings",
    "J.R.R. Tolkien",
    1178,
    false
  );
  [harryPotter, lotor].forEach((book) => (books = [...books, book]));
  getBooks();
})();

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

  //add greenBtn or redBtn class to button
  isReadBtn.classList.add(addBtnClass(book));

  bookContainer.appendChild(div);
}

//helper to create html for the book div, use prototype function below?
function createHTML(book) {
  const read = book.finished;
  const mssgToUser = read
    ? "you have read this book."
    : "you have not read this book yet.";
  const readOrUnread = read ? "read" : "unread";

  return `
  <button class="delete" id="delete">x</button>
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
      book.finished = book.finished ? false : true;
      return book;
    }
    return book;
  });
  getBooks();
}

function addBtnClass(book) {
  return book.finished ? "greenBtn" : "redBtn";
}

//okay, can used checked to get selected input, what about other inputs, reduce/map all with condtions?
function extractFormData(form) {
  return [...form.querySelectorAll("input")]
    .filter((input) => input.type !== "radio" || input.checked)
    .map((input) => {
      if (input.type === "radio") {
        return input.value === "read" ? true : false;
      } else if (input.type === "number") {
        return parseInt(input.value);
      }
      return input.value;
    });
}

function addToBooksArr(dataArr) {
  const book = new Book(...dataArr);
  books = [...books, book];
  getBooks();
}

function closeForm() {
  formModal.style.display = "none";
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

addBookBtn.addEventListener("click", () => {
  formModal.style.display = "flex";
});

closeFormBtn.addEventListener("click", () => {
  form.reset();
  closeForm();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dataArr = extractFormData(e.target);
  addToBooksArr(dataArr);
  e.target.reset();
  closeForm();
});
