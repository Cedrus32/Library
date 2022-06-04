// -------------------- BOOK FUNCTIONS -------------------- //
let myLibrary = [];

function Book(bookTitle, bookAuthor, bookPages, bookStatus, bookID) {
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.status = bookStatus;
    this.id = bookID;
}

let bookID = 0;
function makeBook() {
    let bookTitle = document.getElementById('book-title').value;
    let bookAuthor = document.getElementById('book-author').value;
    let bookPages = document.getElementById('book-pages').value;
    let bookStatus = document.getElementById('book-status').value;
    bookID = bookID++;

    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus, bookID);
    return newBook;
}

function addBook() {
    let newBook = makeBook();
    myLibrary.push(newBook);
}



// -------------------- ADD/REFRESH -------------------- //

let table = document.querySelector('tbody');
function displayLibrary(myLibrary) {
    for (let book in myLibrary) {
        let row = document.createElement('tr');
        table.appendChild(row);
        for (let i = 0; i < 5; i++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
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
                    delIcon.alt = 'delete book';
                    delIcon.id = myLibrary[book].id;
                    cell.appendChild(delIcon);
                    setRemoveListener(delIcon);
            }
        }
    }
}

function clearTable(table) {
    while (table.lastChild) {
        table.removeChild(table.lastChild);
    }
}

function refreshDisplay() {
    clearTable(table);
    displayLibrary(myLibrary);
}



// -------------------- DELETE/REFRESH -------------------- //

function deleteRow(icon) {
    let parentRow = icon.parentElement.parentElement;
    parentRow.remove();
}

function deleteData(bookID) {
    let idNum = parseInt(bookID);
    for (let book in myLibrary) {
        if (myLibrary[book].id === idNum) {
            let bookIndex = myLibrary.indexOf(myLibrary[book]);
            myLibrary.splice(bookIndex, 1);
        }
    }
}

function setRemoveListener(icon) {
    icon.addEventListener('click', () => {
        let delBookID = icon.id;
        deleteRow(icon);
        deleteData(delBookID);
        // ! console.log(myLibrary);
    })
}



// -------------------- FORM VALIDATION -------------------- //


let inputBoxes;
function throwError() {
    // X get list of input boxes
    // X check if each input is valid
    // * if input is INVALID, display custom error message BELOW LINE
    // X if error is type mismatch, display error
    // X else if error is no input, display error

    inputBoxes = document.querySelectorAll('input');
    inputBoxes = Array.from(inputBoxes);
    console.log({inputBoxes});
    for (input in inputBoxes) {
        let targetInput = inputBoxes[input];
        if (targetInput.validity.valueMissing === true) {
            targetInput.setCustomValidity('Please enter a value');
        } else if (targetInput.validity.patternMismatch === true) {
            targetInput.setCustomValidity('Please enter a value of at least 0');
        }
        generateErrorMsg(targetInput);
    }
}

function generateErrorMsg(input) {
    let parentDiv = input.parentElement;
    let errorMsg = document.createElement('div');
    errorMsg.classList.add('error');
    errorMsg.textContent = input.validationMessage;
    parentDiv.insertBefore(errorMsg, input);
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
        let id = bookID;
        // * create new Book instance
        let newBook = new Book(title, author, pages, status, id);
        // * push to library
        myLibrary.push(newBook);
        bookID++;
    }
}

createSampleBooks(sampleBooks);
displayLibrary(myLibrary);



// -------------------- BUTTON FUNCTIONALITY -------------------- //

// * remove functionality set when generating table ^^^

// * brings popup form
let add = document.getElementById('add');
let popup = document.querySelector('.popup');
add.addEventListener('click', () => {
    popup.classList.add('show');
});

// * makes & adds new book to library
let confirm = document.getElementById('conf');
confirm.addEventListener('click', () => {
    let popupForm = document.querySelector('form');
    // ! console.log(popupForm.checkValidity());
    if (popupForm.checkValidity() === true) {
        addBook();
        popup.classList.remove('show');
        refreshDisplay();
        // ! console.log(myLibrary);
    } else {
        // ! console.log('throw error');
        throwError();
    }
});

// * add event listener on keydown to remove error messages
// * listen for keydown
// * check for validity on targetInput
// * if invalid, throw LIVE error


// * cancels input
let cancel = document.getElementById('canc');
cancel.addEventListener('click', () => {
    popup.classList.remove('show');
});