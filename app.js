const bookContainer = document.querySelector("#book-container");
const addBookBtn = document.querySelector("#add-btn");
const formModal = document.querySelector("#form-modal");
const form = document.querySelector("form");
const closeFormBtn = document.querySelector("#close-form");

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

//books will initialize with array from local storage or empty array
let books;

//iife to check local storage for book data, if present initialize let books with stored books arr, else empty array.
(function getFromLocalStorage() {
  const storedBooksArr = JSON.parse(localStorage.getItem("books"));
  const booksWithProto = fixProtoChain(storedBooksArr);

  books = booksWithProto.length > 0 ? booksWithProto : [];
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
  const readOrUnread = book.finished ? "read" : "unread";

  return `
  <button class="delete" id="delete">x</button>
  <p class="book-info">
    ${book.info()} 
  </p>
  <button class="isRead" id="isRead">${readOrUnread}</button>
  `;
}

//each card will have delete btn that will remove obj from array, resave, and render again
function deleteBook(index) {
  books = books.filter((_, bookIndex) => parseInt(index) !== bookIndex);
  saveToLocalStorage();
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
  saveToLocalStorage();
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
  saveToLocalStorage();
  getBooks();
}

function closeForm() {
  formModal.style.display = "none";
}

function saveToLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

function fixProtoChain(booksArr) {
  return booksArr.map((book) => {
    return Object.setPrototypeOf(book, Object.create(Book.prototype));
  });
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
  closeForm();
  form.reset();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dataArr = extractFormData(e.target);

  addToBooksArr(dataArr);
  closeForm();
  e.target.reset();
});
