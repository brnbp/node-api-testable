describe('Route Books', () => {
  const Books = app.datasource.models.Books;
  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default Book description',
  };

  const joiBookDefault = {
    id: Joi.number(),
    name: Joi.string(),
    description: Joi.string(),
    created_at: Joi.date().iso(),
    updated_at: Joi.date().iso(),
  };

  beforeEach(done => {
    Books
      .destroy({ where: {} })
      .then(() => Books.create(defaultBook))
      .then(() => done());
  });

  describe('Route GET /books', () => {
    it('should return a list of books', done => {
      const booksList = Joi.array().items(Joi.object().keys(joiBookDefault));

      request
        .get('/books')
        .end((error, response) => {
          joiAssert(response.body, booksList);
          done(error);
        });
    });
  });
  describe('Route GET /books/{id}', () => {
    it('should return a book', done => {

      const joiBookDefault = {
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      };

      const book = Joi.object().keys(joiBookDefault);
      request
        .get('/books/1')
        .end((error, response) => {
          joiAssert(response.body, book);
          done(error);
        });
    });
  });

  describe('Rouote POST /books', () => {
    it('should create a book', done => {
      const newBook = {
        id: 2,
        name: 'NewBook',
        description: 'create new book',
      };

      const book = Joi.object().keys(joiBookDefault);

      request
        .post('/books')
        .send(newBook)
        .end((error, response) => {
          joiAssert(response.body, book);
          done(error);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a book', done => {
      const updatedBook = {
        id: 1,
        name: 'updated book',
      };

      const bookCount = Joi.array().items(1);

      request
        .put('/books/1')
        .send(updatedBook)
        .end((error, response) => {
          joiAssert(response.body, bookCount);
          done(error);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
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
