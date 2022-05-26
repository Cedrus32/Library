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
    // ? console.log(bookTitle + ' ' + bookAuthor + ' ' + bookPages + ' ' + bookStatus);
    
    // * create Book instance...
    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    // ? console.log(newBook);

    return newBook;
}

function addBook() {
    // * captures input, creates new Book
    let newBook = makeBook();
    // * add to library
    myLibrary.push(newBook);
}

let table = document.querySelector('tbody');
// ? console.log(table);
function displayLibrary(myLibrary) {
    let book;
    for (book in myLibrary) {
        console.log(myLibrary[book]);
        // * generate row
        let row = document.createElement('tr');
        table.appendChild(row);
        // ? console.log(row);
        // * generate cells
        for (let i = 0; i < 5; i++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
            // * populate row/cells with data
            switch (i) {
                case 0:
                    cell.textContent = myLibrary[book].title;
                    // console.log(myLibrary[book].title);
                    break;
                case 1:
                    cell.textContent = myLibrary[book].author;
                    // console.log(myLibrary[book].author);
                    break;
                case 2:
                    cell.textContent = myLibrary[book].pages;
                    // console.log(myLibrary[book].pages);
                    break;
                case 3:
                    cell.textContent = myLibrary[book].status;
                    // console.log(myLibrary[book].status);
                    break;
                case 4:
                    let delIcon = document.createElement('img');
                    delIcon.src = './icons/delete.svg';
                    delIcon.alt = 'delete book'
                    cell.appendChild(delIcon);
                    // console.log('delete');
            }
        }
        
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

for (let book in sampleBooks) {
    // ? console.log(sampleBooks[book]);
    // * read through book, split @ ', ' and assign to title, author, pages, status
    let protoBook = sampleBooks[book].split(', ');
    // ? console.log(protoBook);
    // * create new Book instance
    let protoTitle = protoBook[0];
    let protoAuthor = protoBook[1];
    let protoPages = protoBook[2];
    let protoStatus = protoBook[3];
    // ? console.log(protoStatus);
    let newBook = new Book(protoTitle, protoAuthor, protoPages, protoStatus);
    // * push to library
    myLibrary.push(newBook);
}

// ? console.log(myLibrary);

displayLibrary(myLibrary);

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