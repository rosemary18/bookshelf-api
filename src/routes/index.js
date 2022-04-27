const {bookHandler} = require('../handlers')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: bookHandler.addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: bookHandler.getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: bookHandler.getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: bookHandler.editBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: bookHandler.deleteBookById,
  },
];

module.exports = routes;