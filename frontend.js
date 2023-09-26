// create a react js page to add book information
import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './App.css';

export default function App() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");


  function validateForm() {
    return title.length > 0 && price.length > 0 && author.length > 0 && publisher.length > 0 && description.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="title" bsSize="large">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="price" bsSize="large">
          <ControlLabel>Price</ControlLabel>
          <FormControl
            value={price}
            onChange={e => setPrice(e.target.value)}
            type="number"
          />
        </FormGroup>
        <FormGroup controlId="author" bsSize="large">
          <ControlLabel>author</ControlLabel>
          <FormControl
            value={author}
            onChange={e => setAuthor(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="publisher" bsSize="large">
          <ControlLabel>Publisher</ControlLabel>
          <FormControl
            value={publisher}
            onChange={e => setPublisher(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="description" bsSize="large">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            value={description}
            onChange={e => setDescription(e.target.value)}
            type="text"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Add Book
        </Button>
        </form>
    </div>
    );
}

// create a react js page to list book information
import React, { useState, useEffect } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './App.css';

export default function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/books')
      .then(res => res.json())
      .then(books => setBooks(books));
  },[]);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>author</th>
            <th>Publisher</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr>
              <td>{book.title}</td>
              <td>{book.price}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

