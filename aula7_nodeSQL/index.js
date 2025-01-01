var express = require('express');
var exphbs = require('express-handlebars');
var pool = require('./db/conn.js')

var app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
});

//Inserindo dados no banco de dados
app.post('/books/insertbook', function (req, res) {
    var title = req.body.title;
    var pageqty = req.body.pageqty;

    var queryInsert = `INSERT INTO books (title, pageqty) VALUES ('${title}','${pageqty}')`;
    
    pool.query(queryInsert, function (err, result) {
        if (err) {
            console.log('Erro ao inserir livro');
            return;
        }
        res.redirect('/books');
    });
});

//Listando dados do banco de dados
app.get('/books', function (req, res) {
    var queryRead = 'SELECT * FROM books';

    pool.query(queryRead, function (err, result) {
        if (err) {
            console.log('Erro ao listar livros');
            return;
        }
        res.render('books', { books: result });
    });
});

//Resgatando dados especificos do banco de dados
app.get('/books/:id', function (req, res) {
    var id = req.params.id;
    var queryRetrieve = `SELECT * FROM books WHERE id = ${id}`;

    pool.query(queryRetrieve, function (err, result) {
        if (err) {
            console.log('Erro ao listar livro');
            return;
        }
        res.render('book', { book: result[0] });
    });
});

// Editando dados do banco de dados
// busca inicialmente o livro que será editado
app.get('/books/edit/:id', function (req, res) {
    var id = req.params.id;
    var queryEdit = `SELECT * FROM books WHERE id = ${id}`;

    pool.query(queryEdit, function (err, result) {
        if (err) {
            console.log('Erro ao editar livro');
            return;
        }
        res.render('editbook', { book: result[0] });
    });
});

//edita a id com os novos dados
app.post('/books/updatebook', function (req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var pageqty = req.body.pageqty;

    var queryUpdate = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = '${id}'`;

    pool.query(queryUpdate, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/books');
    });
});

// Deleta dados do banco de dados

app.get('/books/remove/:id', function (req, res) {
    var id = req.params.id;
    var queryDelete = `DELETE FROM books WHERE id = ${id}`;

    pool.query(queryDelete, function (err) {
        if (err) {
            console.log('Erro ao deletar livro');
            return;
        }
        res.redirect('/books');
    });
});

// Criando a conexão com o banco de dados

app.listen(3000)