var fs = require('fs');
var articles = JSON.parse(fs.readFileSync('./data/articles.json', 'utf8'));
var tips = JSON.parse(fs.readFileSync('./data/tips.json', 'utf8'));

/* GET news view */
const news = (req, res) => {
    res.render('news', { title: 'Travlr Getaways news', articles, tips});
};

module.exports = {
    news
};