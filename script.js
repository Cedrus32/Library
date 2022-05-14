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
add.addEventListener('click', () => {
    alert('add');
});

let del = document.getElementById('del');
del.addEventListener('click', () => {
    console.log('del');
});

let confirm = document.getElementById('conf');
confirm.addEventListener('click', () => {
    console.log('conf');
});

let cancel = document.getElementById('canc');
cancel.addEventListener('click', () => {
    console.log('cancel');
});