describe('Routes Books', () => {
  const Books = app.datasource.models.Books;
  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description',
  };

  beforeEach(done => {
    Books
      .destroy({ where: {} })
      .then(() => Books.create(defaultBook))
      .then(() => done());
  });

  describe('Route GET /books', () => {
    it('should return a list of books', done => {
      request
        .get('/books')
        .end((error, response) => {
          expect(response.body[0].id).to.be.eql(defaultBook.id);
          expect(response.body[0].name).to.be.eql(defaultBook.name);
          expect(response.body[0].description).to.be.eql(defaultBook.description);
          done(error);
        });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('should return a book', done => {
      request
        .get('/books/1')
        .end((error, response) => {
          expect(response.body.id).to.be.eql(defaultBook.id);
          expect(response.body.name).to.be.eql(defaultBook.name);
          expect(response.body.description).to.be.eql(defaultBook.description);
          done(error);
        });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', done => {
      const newBook = {
        id: 2,
        name: 'newBook',
        description: 'New Book Create',
      };
      request
        .post('/books')
        .send(newBook)
        .end((error, response) => {
          expect(response.body.id).to.be.eql(newBook.id);
          expect(response.body.name).to.be.eql(newBook.name);
          expect(response.body.description).to.be.eql(newBook.description);
          done(error);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a book', done => {
      const updatedBook = {
        id: 1,
        name: 'Updated Book',
      };
      request
        .put('/books/1')
        .send(updatedBook)
        .end((error, response) => {
          expect(response.body).to.be.eql([1]);
          done(error);
        });
    });
  });

  describe('Route DELETE /books/:id', () => {
    it('should delete a book', done => {
      request
        .delete('/books/1')
        .end((error, response) => {
          expect(response.statusCode).to.be.eql(204);
          done(error);
        });
    });
  });
});
