# Bookshelf-API Documentation
Daftar API Bookshelf API
Terdapat 5 api yang dapat diakses pada bookshelf-api.

API 1 : API dapat menyimpan buku
API dapat menyimpan buku melalui route:

Method : POST
URL : /books
Body Request:

API 2 : API dapat menampilkan seluruh buku
API dapat menampilkan seluruh buku yang disimpan melalui route:

Method : GET
URL: /books

Server mengembalikan respons dengan:

Status Code : 200
Response Body

API 3 : API dapat menampilkan detail buku
API dapat menampilkan seluruh buku yang disimpan melalui route:

Method : GET
URL: /books/{bookId}

Bila buku dengan id yang dilampirkan oleh client tidak ditemukan, maka server mengembalikan respons dengan:

Status Code : 404
Response Body

API 4 : API dapat mengubah data buku
API dapat mengubah data buku berdasarkan id melalui route:

Method : PUT
URL : /books/{bookId}
Body Request

API 5 : API dapat menghapus buku
API dapat menghapus buku berdasarkan id melalui route berikut:

Method : DELETE
URL: /books/{bookId}
Bila id yang dilampirkan tidak dimiliki oleh buku manapun, maka server mengembalikan respons berikut:

Status Code : 404
Response Body

