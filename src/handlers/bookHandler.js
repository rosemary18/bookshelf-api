const {nanoid} = require('nanoid');
const {BOOK} = require('../storage');

const addBook = (request, res) => {

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (name === undefined) {

    const response = res.response({ status: 'Gagal', message: 'Gagal menambahkan buku. Mohon isi nama buku' });
    response.code(400);
    return response;

  } else if (readPage > pageCount) {

    const response = res.response({ status: 'Gagal', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' });
    response.code(400);
    return response;

  } else {

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

    BOOK.push(newBook);

    const isSuccess = BOOK.filter((note) => note.id === id).length > 0;

    if (isSuccess) {

      const response = res.response({ status: 'Success', message: 'Buku berhasil ditambahkan', data: newBook });
      response.code(201);
      return response;

    }
  }

  const response = res.response({ status: 'Error', message: 'Catatan gagal ditambahkan' });
  response.code(500);
  return response;

};

const getAllBooks = (request, res) => {

  const {name, reading, finished} = request.query;

  if (name !== undefined) {

    const BooksName = BOOK.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const response = res.response({ status: 'Success', data: BooksName.map((book) => ({ id: book.id, name: book.name, publisher: book.publisher}))});
    response.code(200);
    return response;
  
  } else if (reading !== undefined) {

    const BooksReading = BOOK.filter((book) => Number(book.reading) === Number(reading));
    const response = res.response({ status: 'Success', data: BooksReading.map((book) => ({id: book.id, name: book.name, publisher: book.publisher}))});
    response.code(200);
    return response;
  
  } else if (finished !== undefined){

    const BooksFinished = BOOK.filter((book) => book.finished == finished);
    const response = res.response({ status: 'Success', data: BooksFinished.map((book) => ({ id: book.id, name: book.name, publisher: book.publisher}))});
    response.code(200);
    return response;
  
  } else {

    const response = res.response({status: 'Success', data: BOOK.map((book) => ({ id: book.id, name: book.name, publisher: book.publisher }))});
    response.code(200);
    return response;

  }
};

const getBookById = (request, res) => {

  const {id} = request.params;
  const book = BOOK.filter((b) => b.id === id)[0];

  if (book !== undefined) {

    return res.response({ status: 'Success', data: book })
    
  }

  const response = res.response({ status: 'Gagal', message: 'Buku tidak ditemukan' });
  response.code(404);
  return response;

};

const editBookById = (request, res) => {

  const {id} = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  
  const updatedAt = new Date().toISOString();
  const index = BOOK.findIndex((book) => book.id === id);

  if (name === undefined) {

    const response = res.response({ status: 'Gagal', message: 'Gagal memperbarui buku. Mohon isi nama buku' });
    response.code(400);
    return response;
  
  } else if (readPage > pageCount) {

    const response = res.response({ status: 'Gagal', message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' });
    response.code(400);
    return response;

  } else if (index !== -1) {

    BOOK[index] = { ...BOOK[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt };
    const response = res.response({ status: 'Success', message: 'Buku berhasil diperbarui' });
    response.code(200);
    return response;
  
  } else {

    const response = res.response({ status: 'Gagal', message: 'Gagal memperbarui buku. Id tidak ditemukan' });
    response.code(404);
    return response;

  }
};

const deleteBookById = (request, res) => {

  const {id} = request.params;
  const index = BOOK.findIndex((book) => book.id === id);

  if (index !== -1) {

    BOOK.splice(index, 1);
    const response = res.response({ status: 'Success', message: 'Buku berhasil dihapus' });
    response.code(200);
    return response;

  }

  const response = res.response({ status: 'Gagal', message: 'Buku gagal dihapus. Id tidak ditemukan' });
  response.code(404);
  return response;

};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
