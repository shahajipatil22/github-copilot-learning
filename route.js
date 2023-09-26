/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 * 
 * /books:
 *   get:
 *     summary: Get a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   price:
 *                     type: number
 *                   author:
 *                     type: string
 *                   publisher:
 *                     type: string
 *                   description:
 *                     type: string
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 * 
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A book object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 price:
 *                   type: number
 *                 author:
 *                   type: string
 *                 publisher:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Book not found
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 */
// include express
// add express routers
const express = require('express');
const router = express.Router();

// create get route
router.get('/welcome', (req, res) => res.send('Hello World!'));

// create mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin1234@cluster0.xojab8j.mongodb.net/test_db', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// create db model to store books information in mongodb
const bookService = mongoose.model('book', {
    title: String,
    price: Number,
    author: String,
    publisher: String,
    description: String,
});


// rest api using express and mongodb with mongoose with crud operations
// create get list of books route
router.get('/', function(req, res, next) {
    bookService.find()
        .then(books => res.json(books))
        .catch(err => next(err));
    }
);


// add validator to save book route validateBookExist, and input validation using validateBookInput function 
router.post('/', validateBookExist, function(req, res, next) {
    const { error } = validateBookInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    bookService.create(req.body)
        .then(() => res.json({status: 'success' }))
        .catch(err => next(err));
    }
);


// create get book by id route
router.get('/:id', function(req, res, next) {
    bookService.findOne({ _id: req.params.id })
        .then(book => book ? res.json(book) : res.sendStatus(404))
        .catch(err => next(err));
    }
);

// create update book route
router.put('/:id', function(req, res, next) {
    bookService.updateOne({ _id: req.params.id }, { $set: req.body})
        .then((rs) => res.json({status: 'success' }))
        .catch(err => next(err));
    }
);

// create delete book route
router.delete('/:id', function(req, res, next) {
    bookService.deleteOne({ _id: req.params.id })   
        .then(() => res.json({}))
        .catch(err => next(err));   
    }
); 

// import joi module
const Joi = require('joi');
// create book validation function to validate book information
function validateBookInput(book) {
    const bookSchema = Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        author: Joi.string().required(),
        publisher: Joi.string().required(),
        description: Joi.string().required()
    });
    return bookSchema.validate(book);
}


// create a middleware function to validate record exist for a given book title in mongodbBook
function validateBookExist(req, res, next){
    bookService.findOne({title: req.body.title})
        .then(book => book ? res.json({status: 'error', message: 'Book already exist!' }) : next())
        .catch(err => next(err));
}
    







    



        







// module export router
module.exports = router;