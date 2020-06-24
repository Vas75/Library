const bookContainer = document.querySelector("#book-container");

const books = [
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
//   const readOrNot = this.finished ? "already read" : "not read yet";

//   return `${this.title} by ${this.author}, ${this.pages} pages, ${readOrNot}.`;
// };

//Page loads, loop gets each book and passes obj to render(),
function getBooks() {
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

  bookContainer.appendChild(div);
}
//helper to create html for the book div,
function createHTML(book) {
  const isRead = book.read
    ? "you have read this book."
    : "you have not read this book yet.";

  return `<div class="book-btns">
    <button class="delete">X</button>
    <button class="readBtn">read</button>
   </div>
  <p class="book-info">
    ${book.title} by ${book.author}, ${book.pages} pages long, ${isRead}
  </p>`;
}

//-each card elem will need data attribute w index of its book obj.
//-each card will have delete btn that will remove obj from array, resave, and render again
//

//

//

//eventlisteners
bookContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.parentNode.parentNode.dataset.index;
  }
});
