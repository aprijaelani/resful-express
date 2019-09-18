module.exports = (app) => {
    const article = require('../controller/articleController');

    // Create a new Article
    app.post('/api/article', article.create);

    // Retrieve all article
    app.get('/api/article', article.findAll);

    // Create a new Article
    app.post('/api/article/search', article.search);

    // Retrieve a single Article with ArticleId
    app.get('/api/article/:articleId', article.findOne);

    // Update a Article with articleId
    app.put('/api/article/:articleId', article.update);

    // Delete a Article with articleId
    app.delete('/api/article/:articleId', article.delete);
}