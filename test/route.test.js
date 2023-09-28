const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const API = 'http://localhost:3005'

chai.use(chaiHttp);

describe('Books API', () => {
  let bookId;

  // Test the GET /welcome route
  describe('GET /books/welcome', () => {
    it('should return "Hello World!"', (done) => {
      chai.request(API)
        .get('/books/welcome')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Hello World!');
          done();
        });
    });
  });

  // Test the GET / route
  describe('GET /books/', () => {
    it('should return a list of books', (done) => {
      chai.request(API)
        .get('/books/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // Test the POST / route
  describe('POST /books/', () => {
    it('should create a new book', (done) => {
      const book = {
        title: 'Test Book and Test Book ',
        price: 10,
        author: 'Test Author',
        publisher: 'Test Publisher',
        description: 'Test Description'
      };
      chai.request(API)
        .post('/books/')
        .send(book)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('success');
          bookId = res.body.id; // save the book id for later use
          done();
        });
    });
    // Now, let's try to add the same book again and expect a failure
    it('should not create a book if it already exists', (done) => {
      const duplicateBook = {
        title: 'Test Book',
        price: 10,
        author: 'Test Author',
        publisher: 'Test Publisher',
        description: 'Test Description'
      };
      chai.request(API)
        .post('/books/')
        .send(duplicateBook)
        .end((err, res) => {
          expect(res).to.have.status(409); // 409 is HTTP status code for conflict. Adjust as per your API's response
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Book already exist!'); // adjust this message based on your API's error message
          done();
        });
    });
  });

    

  // Test the GET /:id route
  describe('GET /books/:id', () => {
    it('should return a book by id', (done) => {
      chai.request(API)
        .get(`/books/${bookId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body._id).to.equal(bookId);
          done();
        });
    });
  });

  // Test the PUT /:id route
  describe('PUT /books/:id', () => {
    it('should update a book by id', (done) => {
      const book = {
        title: 'Updated Test Book',
        price: 20,
        author: 'Updated Test Author',
        publisher: 'Updated Test Publisher',
        description: 'Updated Test Description'
      };
      chai.request(API)
        .put(`/books/${bookId}`)
        .send(book)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  });

  // Test the DELETE /:id route
  describe('DELETE /books/:id', () => {
    it('should delete a book by id', (done) => {
      chai.request(API)
        .delete(`/books/${bookId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  
});

