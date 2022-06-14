// -------------------------------------------------------- //
// -------------------- BOOK FUNCTIONS -------------------- //
// -------------------------------------------------------- //

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
    let bookStatus = document.querySelector('input[type="radio"]:checked').value;
    bookID = bookID++;
    
    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus, bookID);
    return newBook;
}

function addBook() {
    let newBook = makeBook();
    myLibrary.push(newBook);
}



// ----------------------------------------------------- //
// -------------------- ADD/REFRESH -------------------- //
// ----------------------------------------------------- //

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



// -------------------------------------------------------- //
// -------------------- DELETE/REFRESH -------------------- //
// -------------------------------------------------------- //

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

        checkStats();
    });
}



// ---------------------------------------------------------- //
// -------------------- ADD SAMPLE BOOKS -------------------- //
// ---------------------------------------------------------- //

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

// * populate table with samples
createSampleBooks(sampleBooks);
displayLibrary(myLibrary);



// --------------------------------------------------------- //
// -------------------- FORM VALIDATION -------------------- //
// --------------------------------------------------------- //

let inputBoxes = document.querySelectorAll('input[type="text"]');
let radioButtons = document.querySelectorAll('input[type="radio"]');

function getRadioButtons() {
    radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons = Array.from(radioButtons);
}

function getInputBoxes() {
    inputBoxes = document.querySelectorAll('input[type="text"]');
    inputBoxes = Array.from(inputBoxes);
}

function throwMissingValueError() {
    getInputBoxes();
    getRadioButtons();

    // * check text boxes
    for (targetInput in inputBoxes) {
        let input = inputBoxes[targetInput];
        if (input.validity.customError === false) {
            if (input.validity.valueMissing === true) {
                generateErrorMsg(input);
            }
        }
    }

    // * check radio buttons
    if (radioButtons[0].validity.customError === false) {
        if (radioButtons.some(radioChecked) === false) {
            generateErrorMsg(radioButtons[0]);
        }
    }
}

function radioChecked(button) {
    return button.checked;
}

function updateCustomError(input) {
    if ((input[type='radio']) || (input.checkValidity() === true) || (input.validity.valueMissing === true) || ((input.validity.customError === true) && (input.validity.valueMissing === false))) {
    // *       input is radio OR             input is valid       OR                   input is blank       OR     (input has old "blank" error       AND             input is not blank)
        removeErrorMsg(input);
    }
    
    if ((input.validity.patternMismatch === true)) {
        generateErrorMsg(input);
    }
}

function generateErrorMsg(input) {
    let parentDiv = input.parentElement;
    if (input.validity.patternMismatch === true) {
        input.setCustomValidity('Please enter a value of at least 0');
    } else if (input.validity.valueMissing === true) {
        input.setCustomValidity('Please enter a value');
    } else if (input.type === 'radio') {
        input = document.getElementById('unread');
        input.setCustomValidity('Please select book status');
        parentDiv = document.querySelector('div.status-input');
    }

    let errorMsg = document.createElement('div');
    errorMsg.classList.add('error');
    errorMsg.textContent = input.validationMessage;
    if (input.type === 'radio') {
        parentDiv.insertBefore(errorMsg, parentDiv.firstChild);
    } else {
        parentDiv.insertBefore(errorMsg, input);
    }
}

function removeErrorMsg(input) {
    let errorMsg;
    if (input.type === 'radio') {
        input = document.getElementById('unread');
        input.setCustomValidity('');
        // let parentDiv = document.querySelector('div.status-input');
        errorMsg = document.querySelector('div.status-input div.error');
    } else {
        input.setCustomValidity('');
        errorMsg = input.previousSibling;
    }
    errorMsg.remove();
}

function scrubErrors() {
    let errorMsgs = document.querySelectorAll('div.error');
    errorMsgs.forEach(error => error.remove());
}

// * update input validity live
inputBoxes.forEach(targetInput => targetInput.addEventListener('input', () => {
    updateCustomError(targetInput);
}));
radioButtons.forEach(targetButton => targetButton.addEventListener('change', () => {
    let unreadButton = document.getElementById('unread');
    if ((targetButton.checked === true) && (unreadButton.validity.customError === true)) {
        updateCustomError(targetButton);
    }
}));


// -------------------------------------------------------------- //
// -------------------- BUTTON FUNCTIONALITY -------------------- //
// -------------------------------------------------------------- //

let add = document.getElementById('add');
let popup = document.querySelector('.popup');
let confirm = document.getElementById('conf');
let cancel = document.getElementById('canc');
let form = document.getElementById('form');

// * remove functionality set when generating table ^^^

// * brings popup form
add.addEventListener('click', () => {
    popup.classList.add('show');
});

// * makes & adds new book to library
confirm.addEventListener('click', () => {
    let popupForm = document.querySelector('form');
    getRadioButtons();
    // ! console.log(popupForm.checkValidity());
    
    if ((popupForm.checkValidity() === true) && (radioButtons.some(radioChecked) === true)) {
        addBook();
        popup.classList.remove('show');
        refreshDisplay();
        // ! console.log(myLibrary);
        form.reset();
    } else {
        throwMissingValueError();
    }

    checkStats();
});

// * cancels input
cancel.addEventListener('click', () => {
    form.reset();
    scrubErrors();
    popup.classList.remove('show');
});



// --------------------------------------------------- //
// -------------------- STATS BAR -------------------- //
// --------------------------------------------------- //

let rows = Array.from(document.querySelectorAll('tbody tr'));
let totalBooks = document.getElementById('num-books');
let booksRead = document.getElementById('books-read');
let pagesRead = document.getElementById('pages-read');

let currLength = table.children.length;
let prevLength;

function getTotalBooks() {
    let numBooks = rows.length;
    return numBooks;
}

function getBooksRead() {
    let read = rows.filter(checkRead);
    let numRead = read.length;
    return numRead;
}

function checkRead(mutRow) {
    let status = mutRow.childNodes[3];
    return status.textContent === 'read';
}

function getPagesRead() {
    let numPages = 0;
    for (let row in rows) {
        let status = rows[row].childNodes[3].textContent;
        if (status === 'read') {
            let pages = parseInt(rows[row].childNodes[2].textContent);
            numPages += pages;
        }
    }
    return numPages;
}

function updateStats() {
    rows = Array.from(document.querySelectorAll('tbody tr'));

    let numBooks = getTotalBooks();
    totalBooks.textContent = numBooks;

    let numRead = getBooksRead();
    booksRead.textContent = numRead;

    let numPages = getPagesRead();
    pagesRead.textContent = numPages;
}

function checkStats() {
    prevLength = currLength;
    currLength = table.children.length;

    if (currLength !== prevLength) {
        console.log('table was changed');
        updateStats();
    }
}

// * sets stat display for each
let numBooks = getTotalBooks();
totalBooks.textContent = numBooks;

let numRead = getBooksRead();
booksRead.textContent = numRead;

let numPages = getPagesRead();
pagesRead.textContent = numPages;

// * live stat check in confirm/remove eventListeners ^^^


// ------------------------------------------------------- //
// -------------------- SORT & FILTER -------------------- //
// ------------------------------------------------------- //

let navButtons = document.querySelectorAll('section.sort button');
let lastButton;
let currButton = undefined;

let infoSort = ['srt-title', 'srt-author', 'srt-pages'];
let statSort = ['srt-unread', 'srt-reading', 'srt-read'];
let statRefs;

let sortingTable;
let sortingGroups;
let shouldSortTable;
let shouldSortGroup;

let r;
let j;

function sortTable() {
    // set sorting to true
    sortingTable = true

    // start sorting
    while (sortingTable === true) {
        // pause sorting as way to break out of loop
        sortingTable = false;

        // * enacts sorting functions
        if (infoSort.includes(currButton.id)) {
            table = document.querySelector('tbody');
            let rows = table.rows;
            sortByInfo(rows);
        } else if (statSort.includes(currButton.id)) {
            sortByStatus();
        }
    }
}

function sortByInfo(rows) {
    for (r = 0; r < (rows.length - 1); r++) {
        shouldSortTable = false;

        let currRow = rows[r];
        let nextRow = rows[r + 1];
        let x;
        let y;

        switch (currButton.id) {
            case 'srt-title':
                x = currRow.children[0].textContent;
                y = nextRow.children[0].textContent;
                break;
            case 'srt-author':
                x = currRow.children[1].textContent;
                y = nextRow.children[1].textContent;
                break;
            case 'srt-pages':
                x = currRow.children[2].textContent;
                y = nextRow.children[2].textContent;
        }

        // if next content < current content... ...mark as SHOULD sort
        if (x > y) {
            shouldSortTable = true;
            break;
        }
    }
    // if row marked as SHOULD sort... ...place next row before current row
    if (shouldSortTable === true) {
        table.insertBefore(rows[r + 1], rows[r]);
        sortingTable = true;
    }
}

function sortByStatus() {
    // set status references
    switch (currButton.id) {
        case 'srt-unread':
            statRefs = ['unread', 'reading', 'read'];
            break;
        case 'srt-reading':
            statRefs = ['reading', 'unread', 'read'];
            break;
        case 'srt-read':
            statRefs = ['read', 'reading', 'unread'];
    }

    // create grouped library template
    let groupedLibrary = myLibrary.reduce((newLib, book) => {
        // initialize groupings
        if (!newLib[book.status]) {
            newLib[book.status] = [];
        };
        // fill groupings
        newLib[book.status].push(book);
        
        return newLib;
    }, {});

    // * wipes table
    clearTable(table);

    // * redraws table based on order of status references
    for (j = 0; j < 3; j++) {
        let key = statRefs[j];
        // ! console.log({libraryPart});
        displayLibrary(groupedLibrary[key]);
    }

    // set sorting to true
    sortingGroups = true;
    // reset stat counter
    j = 0;

    // start sorting
    while (sortingGroups === true) {
        // pause sorting as way to break out of loop
        sortingGroups = false;

        table = document.querySelector('tbody');
        let rows = table.rows;
        let currRow;
        let nextRow;
        let currGroup;

        let x;
        let y;
        let a;
        let b;

        sortInGroups(rows);
    }
}

function sortInGroups(rows) {
    for (r = 0; r < (rows.length - 1); r++) {
        shouldSortGroup = false;
        currGroup = statRefs[j];

        currRow = rows[r];
        nextRow = rows[r + 1];
        x = currRow.children[0].textContent;
        y = nextRow.children[0].textContent;
        a = currRow.children[3].textContent;
        b = nextRow.children[3].textContent;
        
        // if row in same group AND next content < current content... ...mark as SHOULD sort
        if ((a === currGroup) && (b === currGroup) && (x > y)) {
            // console.log('SHOULD SORT');
            shouldSortGroup = true;
            break;
        }

        // increase j (change status ref) when r at bottom of table
        if (r === (rows.length - 2)) {
            j++;
            if (j < 3) {
                sortingGroups = true;
                r = -1;
            }
        }
    } 
    // if row marked as SHOULD sort... ...place next row before current row
    if (shouldSortGroup === true) {
        table.insertBefore(rows[r + 1], rows[r]);
        sortingGroups = true;
    }
}

// * listens for click on nav buttons
navButtons.forEach(button => button.addEventListener('click', () => {
    lastButton = currButton;
    currButton = button;
    if (lastButton !== currButton) {
        if (lastButton !== undefined) {
            lastButton.classList.remove('view');
        }
        currButton.classList.add('view');
        sortTable();
    }
}));