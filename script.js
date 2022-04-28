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

