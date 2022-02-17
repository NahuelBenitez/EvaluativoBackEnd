const express = require('express');
const booksController = require('../controllers/bookController');

const bodySchema = require('../validationSchemas/booksValidation');
const validator = require('express-joi-validation').createValidator();



const routes = (Book) => {
    const bookRouter = express.Router();

    const { getBooks, postBooks, getBookById, putBooks, deleteBookById, getBookByTitle, getBookByAuthor } = booksController(Book);

    bookRouter.route('/books')
        .get(getBooks, getBookByTitle, getBookByAuthor)
        .post(validator.body(bodySchema), postBooks);

    bookRouter.route('/books/:bookId')
        .get(getBookById)
        .put(putBooks)
        .delete(deleteBookById)


    return bookRouter;
}
module.exports = routes;