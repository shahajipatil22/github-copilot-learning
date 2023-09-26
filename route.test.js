const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Books API', () => {
  // Test the GET route
  describe('GET /books', () => {
    it('should get all books', (done) => {
      chai.request(app)
        .get('/books')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.at.least(1);
          done();
        });
    });
  });

  // Test the POST route
  describe('POST /books', () => {
    it('should add a new book', (done) => {
      const book = {
        title: 'Test Book',
        price: 10,
        author: 'Test Author',
        publisher: 'Test Publisher',
        description: 'Test Description'
      };
      chai.request(app)
        .post('/books')
        .send(book)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  });

  // Test the GET by ID route
  describe('GET /books/:id', () => {
    it('should get a book by ID', (done) => {
      const bookId = '1234567890'; // Replace with a valid book ID
      chai.request(app)
        .get(`/books/${bookId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body._id).to.equal(bookId);
          done();
        });
    });
  });

  // Test the PUT route
  describe('PUT /books/:id', () => {
    it('should update a book', (done) => {
      const bookId = '1234567890'; // Replace with a valid book ID
      const book = {
        title: 'Updated Test Book',
        price: 20,
        author: 'Updated Test Author',
        publisher: 'Updated Test Publisher',
        description: 'Updated Test Description'
      };
      chai.request(app)
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

  // Test the DELETE route
  describe('DELETE /books/:id', () => {
    it('should delete a book', (done) => {
      const bookId = '1234567890'; // Replace with a valid book ID
      chai.request(app)
        .delete(`/books/${bookId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});