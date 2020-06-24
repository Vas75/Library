function Book(title, author, pages, finished) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.finished = finished;
}

Book.prototype.info = function () {
  const readOrNot = this.finished ? "already read" : "not read yet";

  return `${this.title} by ${this.author}, ${this.pages} pages, ${readOrNot}.`;
};

const aBook = new Book("hustler", "larry king", 40, true);

console.log(aBook);
