const Article = require('../models/article');

// Create and Save a new Article
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Article content can not be empty"
        });
    }

    // Create a Article
    const article = new Article({
        id: req.body.id,
        title: req.body.title || "Untitled Article", 
        content: req.body.content,
        thumbnail:req.body.thumbnail
    });

    // Save Article in the database
    article.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Article."
        });
    });
};

// Retrieve and return all article from the database.
exports.findAll = (req, res) => {
    Article.find()
    .then(article => {
        res.send(article);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving article."
        });
    });
};

// search article from the database.
exports.search = (req, res) => {
    Article.find({title: new RegExp('^'+req.body.title+'$', "i")})
    .then(article => {
        res.send(article);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving article."
        });
    });
};

// Find a single Article with a articleId
exports.findOne = (req, res) => {
    Article.findById(req.params.articleId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "Article not found with id " + req.params.articleId
            });            
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving article with id " + req.params.articleId
        });
    });
};

// Update a article identified by the articleId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Article content can not be empty"
        });
    }

    // Find article and update it with the request body
    Article.findByIdAndUpdate(req.params.articleId, {
        title: req.body.title || "Untitled Article", 
        content: req.body.content,
        thumbnail:req.body.thumbnail
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "Article not found with id " + req.params.articleId
            });
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            message: "Error updating article with id " + req.params.articleId
        });
    });
};

// Delete a article with the specified articleId in the request
exports.delete = (req, res) => {
    Article.findByIdAndRemove(req.params.articleId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "article not found with id " + req.params.articleId
            });
        }
        res.send({message: "article deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            message: "Could not delete article with id " + req.params.articleId
        });
    });
};