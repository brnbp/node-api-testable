import BooksController from '../controllers/books';

export default (app) => {
  const booksController = new BooksController(app.datasource.models.Books);

  const respond = (response, res) => {
    response.status(res.statusCode);
    response.json(res.data);
  };

  app.route('/books')
    .get((request, response) => {
      booksController.getAll()
        .then(res => respond(response, res));
    })
    .post((request, response) => {
      booksController.create(request.body)
        .then(res => respond(response, res));
    });

  app.route('/books/:id')
    .get((request, response) => {
      booksController.getById(request.params)
        .then(res => respond(response, res));
    })
    .put((request, response) => {
      booksController.update(request.body, request.params)
        .then(res => respond(response, res));
    })
    .delete((request, response) => {
      booksController.delete(request.params)
        .then(res => respond(response, res));
    });
};
