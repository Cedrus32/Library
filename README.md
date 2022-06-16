# Library

Completed through The Odin Project

https://cedrus32.github.io/Library/

This project is my first to implement classical inheritance, using a constructor to create new instances/objects. I found that using constructors in this was was helpful, and I became comfortable with catching and passing data between the user interface and the "backend" (I realize the library itself is only stored in memory -- this program is not scalable. Ideally, the library would be saved on localStorage or in a database).

The biggest challenge was organizing the displayed data based on user selection, particularly when sorting by 'unread', 'reading', or 'read'. For these, I wanted to not only sort by `status`, but also by `title`. My implementation uses nested 'while' and 'for' loops to create a sorted version of the base library, then display the sorted library by `status` based on user selection, and finally reorganize the table by `title` within each `status` group.

I also worked to display the library in a semantically correct table, implement custom form validations and error messages, and create a dynamic `stats` display as books are added/removed from the library.
