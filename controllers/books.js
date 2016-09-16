const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message,
}, statusCode);

function BooksController(Books) {
  this.Books = Books;

  this.getAll = () =>
     this.Books.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));

  this.getById = (params) =>
     this.Books.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));


  this.create = (data) =>
     this.Books.create(data)
      .then(result => defaultResponse(result, 201))
      .catch(error => errorResponse(error.message, 422));

  this.update = (data, params) =>
     this.Books.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, 422));


  this.delete = (params) =>
     this.Books.destroy({ where: params })
      .then(result => defaultResponse(result, 204))
      .catch(error => errorResponse(error.message));
}

export default BooksController;
