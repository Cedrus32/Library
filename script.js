// -------------------- LIBRARY FUNCTIONS -------------------- //
let myLibrary = [];

function Book(bookTitle, bookAuthor, bookPages, bookStatus) {
    // constructor for book object
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.status = bookStatus;
}

function makeBook() {
    // * get inputs...
    let bookTitle = document.getElementById('book-title').value;
    let bookAuthor = document.getElementById('book-author').value;
    let bookPages = document.getElementById('book-pages').value;
    let bookStatus = document.getElementById('book-status').value;
    // console.log(bookTitle + ' ' + bookAuthor + ' ' + bookPages + ' ' + bookStatus);
    
    // * create Book instance...
    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    // console.log(newBook);

    return newBook;
}

function addBook() {
    // * captures input, creates new Book
    let newBook = makeBook();
    // * add to library
    myLibrary.push(newBook);
}

// function displayLibrary(myLibrary) {
//     let book;
//     for (book in myLibrary) {
//         console.log(myLibrary[book]);
//         // generate table
//     }
// }


// -------------------- MAKE SAMPLE BOOKS -------------------- //


// -------------------- BUTTONS -------------------- //

// * brings popup form
let add = document.getElementById('add');
let popup = document.querySelector('.popup');
add.addEventListener('click', () => {
    console.log('add');
    // * open popup
    popup.classList.add('show');
});

// * makes & adds new book to library
let confirm = document.getElementById('conf');
confirm.addEventListener('click', () => {
    console.log('conf');
    // * add book to library
    addBook();
    console.log(myLibrary);
    // * close popup
    popup.classList.remove('show');
});

// * forgets input
let cancel = document.getElementById('canc');
cancel.addEventListener('click', () => {
    console.log('cancel');
    // * close popup
    popup.classList.remove('show');
});