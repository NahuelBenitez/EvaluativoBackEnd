const bookController = (Book) => {
    const getBooks = async(req, res) => {
        const { query } = req;
        const response = await Book.find(query);
        res.json(response);
    }

    const postBooks = async(req, res) => {
        const book = new Book(req.body);

        await book.save();
        res.json(book);
    }

    const getBookById = async(req, res) => {
        const { params } = req;
        const response = await Book.findById(params.bookId);
        res.json(response);
    }

    const putBooks = async(req, res) => {
        const { body } = req;
        const response = await Book.updateOne({
            _id: req.params.bookId
        }, {
            $set: {
                title: body.title,
                genre: body.genre,
                author: body.author,
                read: body.read
            }
        })
        res.json(response);
    }
    const deleteBookById = async(req, res) => {
        try {
            await Book.findByIdAndDelete(req.params.bookId);
            res.status(202).json('Books has been deleted');
        } catch (err) {
            res.status(404).json('Book not found');
        }

    }

    const getBookByTitle = async(req, res) => {
        const { query } = req;
        const bookName = await Book.findOne({ title: query.title });
        if (bookName === null) {
            res.json('Title is not found');
        } else {
            res.json(bookName);
        }
    }

    const getBookByAuthor = async(req, res) => {
        const { query } = req;
        const bookName = await Book.findOne({ title: query.author });
        if (bookName === null) {
            res.json('Author is not found');
        } else {
            res.json(bookName);
        }
    }


    return { getBooks, postBooks, getBookById, putBooks, deleteBookById, getBookByTitle, getBookByAuthor };
}
module.exports = bookController;