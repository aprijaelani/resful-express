const assert = require('assert');
const ArticleData = require('../models/article');

// Describe our tests
describe('Saving records', function(){

  // Create tests
  it('Saves a record to the database', function(done){

    const article = new ArticleData({
        id: '1',
        title: 'title',
        content: 'content',
        thumbnail: 'thumbnail',
    });

    article.save().then(function(){
      assert(!article.isNew);
      done();
    });

  });

});


describe('Updating records', function(){
    var article;
    // Add a character to the db before each tests
    beforeEach(function(done){
      article = new ArticleData({
        id: '2',
        title: 'title 2',
        content: 'content 2',
        thumbnail: 'thumbnail 2',
      });
      article.save().then(function(){
        done();
      });
    });
  
    // Create tests
    it('Updates the name of a record', function(done){
        ArticleData.findOneAndUpdate({title: 'title 2'}, {title: 'Buffon'}).then(function(){
            ArticleData.findOne({_id: article._id}).then(function(result){
                assert(result.title === 'Buffon');
                done();
            });
        });
    });  
});

describe('Finding records', function(){
    var article;
    // Add a article to the db before each tests
    beforeEach(function(done){
      article = new ArticleData({
        id: '1',
        title: 'title',
        content: 'content',
        thumbnail: 'thumbnail',
      });
      article.save().then(function(){
        done();
      });
    });
  
    // Create tests
    it('Finds a record from the database', function(done){
      ArticleData.findOne({title: 'title'}).then(function(result){
        assert(result.title === 'title');
        done();
      });
    });
  
    it('Finds a record by unique id', function(done){
      ArticleData.findOne({_id: article._id}).then(function(result){
        assert(result._id.toString() === article._id.toString());
        done();
      });
    });  
    
});

// Describe our tests
describe('Deleting records', function(){
    var article;
    // Add a article to the db before each tests
    beforeEach(function(done){
      article = new ArticleData({
        id: '1',
        title: 'title',
        content: 'content',
        thumbnail: 'thumbnail',
      });
      article.save().then(function(){
        done();
      });
    });
  
    // Create tests
    it('Deletes a record from the database', function(done){
      ArticleData.findOneAndRemove({title: 'Title'}).then(function(){
        ArticleData.findOne({title: 'Title'}).then(function(result){
          assert(result === null);
          done();
        });
      });
    });
  
  });
  
