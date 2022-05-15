let myLibrary = ['book1',
                 'book2',
                 'book3',];

function Book() {
    // constructor for book object
}

function addBook(book) {
    // add book object to library
    myLibrary.push(book);
}

function displayLibrary(library) {
    let book;
    for (book in library) {
        console.log(library[book]);
    }
}

let add = document.getElementById('add');
let popup = document.querySelector('.popup');
add.addEventListener('click', () => {
    console.log('add');
    popup.classList.add('show');
});

let confirm = document.getElementById('conf');
confirm.addEventListener('click', () => {
    console.log('conf');
    popup.classList.remove('show');
});

let cancel = document.getElementById('canc');
cancel.addEventListener('click', () => {
    console.log('cancel');
    popup.classList.remove('show');
});