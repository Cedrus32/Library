// -------------------- LIBRARY FUNCTIONS -------------------- //
let myLibrary = [];

function Book(bookTitle, bookAuthor, bookPages, bookStatus) {
    // * constructor for book object
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
    // * create Book instance...
    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);

    return newBook;
}

function addBook() {
    // * captures input, creates new Book
    let newBook = makeBook();
    // * add to library
    myLibrary.push(newBook);
}

let table = document.querySelector('tbody');
function displayLibrary(myLibrary) {
    for (let book in myLibrary) {
        // * generate row
        let row = document.createElement('tr');
        table.appendChild(row);
        // * generate cells
        for (let i = 0; i < 5; i++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
            // * populate row/cells with data
            switch (i) {
                case 0:
                    cell.textContent = myLibrary[book].title;
                    break;
                case 1:
                    cell.textContent = myLibrary[book].author;
                    break;
                case 2:
                    cell.textContent = myLibrary[book].pages;
                    break;
                case 3:
                    cell.textContent = myLibrary[book].status;
                    break;
                case 4:
                    let delIcon = document.createElement('img');
                    delIcon.src = './icons/delete.svg';
                    delIcon.alt = 'delete book'
                    cell.appendChild(delIcon);
            }
        }
    }
}

function clearTable(table) {
    while (table.lastChild) {
        table.removeChild(table.lastChild);
    }
}



// -------------------- ADD SAMPLE BOOKS -------------------- //

sampleBooks = ['Dune, Frank Herbert, 685, read',
               'Outlander, Diana Gabaldon, 850, read',
               'Shadow and Bone, Leigh Bardugo, 358, read',
               'Gyo, Ito Junji, 400, unread',
               'Shadow & Claw, Gene Wolfe, 413, unread',
               'Darker Shades of Magic, V.E. Schwab, 400, read',
               'Sarum, Edward Rutherford, 912, read',
               'American Gods, Neil Gaiman, 635, unread',
               'Lirael, Garth Nix, 464, reading',
               'Sabriel, Garth Nix, 491, read',
              ]

function createSampleBooks(sampleBooks) {
    for (let book in sampleBooks) {
        // * read through book, split @ ', '
        let splitBook = sampleBooks[book].split(', ');
        // * assign to title, author, pages, status
        let title = splitBook[0];
        let author = splitBook[1];
        let pages = splitBook[2];
        let status = splitBook[3];
        // * create new Book instance
        let newBook = new Book(title, author, pages, status);
        // * push to library
        myLibrary.push(newBook);
    }
}

createSampleBooks(sampleBooks);
displayLibrary(myLibrary);



// -------------------- BUTTONS -------------------- //

// * brings popup form
let add = document.getElementById('add');
let popup = document.querySelector('.popup');
add.addEventListener('click', () => {
    // * open popup
    popup.classList.add('show');
});

// * makes & adds new book to library
let confirm = document.getElementById('conf');
confirm.addEventListener('click', () => {
    // * add book to library
    addBook();
    // * close popup
    popup.classList.remove('show');
    // * clear table
    clearTable(table);
    // * display updated library
    displayLibrary(myLibrary);
});

// * forgets input
let cancel = document.getElementById('canc');
cancel.addEventListener('click', () => {
    // * close popup
    popup.classList.remove('show');
});