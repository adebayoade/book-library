// Book object
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Object
class UI {
  constructor() {
    this.UItitle = document.querySelector('#title');
    this.UIauthor = document.querySelector('#author');
    this.UIisbn = document.querySelector('#isbn');
    this.UIbooksList = document.getElementById('books-list');
    this.UIalert;
  }

  addBook(book) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td class="title">${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a><i class="fas fa-trash"></i></a></td>
    `;

    this.UIbooksList.querySelector('tbody').append(tr);
  }

  deleteBook(target) {
    target.parentElement.parentElement.parentElement.remove();
  }

  clearFields() {
    this.UItitle.value = '';
    this.UIauthor.value = '';
    this.UIisbn.value = '';
  }

  showAlert(message, alertType) {
    if (document.querySelector('.alert') === null) {
      this.UIalert = document.createElement('div');
      this.UIalert.textContent = message;
      this.UIalert.className = `alert ${alertType}`;

      const container = document.querySelector('.container');
      container.insertBefore(this.UIalert, container.querySelector('.box'));

      setTimeout(() => {
        document.querySelector('.alert').remove();
      }, 3000);
    }
  }

  searchBooks(term) {
    const bookTitles = document.querySelectorAll('.title');

    bookTitles.forEach((title) => {
      if (title.textContent.toLowerCase().indexOf(term) != -1) {
        title.parentElement.style.display = 'table-row';
      } else {
        title.parentElement.style.display = 'none';
      }
    });
  }
}

// Add book to the list
document.forms['add-book'].addEventListener('submit', (e) => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // UI Object
  const ui = new UI();

  // Validation
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in the fields.', 'danger');
  } else {
    // instantiate a book object
    const book = new Book(title, author, isbn);

    // Call UI methods
    ui.addBook(book);
    ui.clearFields();
    ui.showAlert('Added to Library!', 'success');
  }

  e.preventDefault();
});

// Search Library
document.getElementById('search').addEventListener('keyup', (e) => {
  // instantiate UI Object
  const ui = new UI();
  ui.searchBooks(e.target.value.toLowerCase());
});

// Delete Book
document.getElementById('books-list').addEventListener('click', (e) => {
  if (e.target.tagName === 'I') {
    const ui = new UI();

    ui.deleteBook(e.target);
    ui.showAlert('Deleted Successfully!', 'success');
  }
});
