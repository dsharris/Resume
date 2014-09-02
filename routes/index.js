var express = require('express'),
	router = express.Router(),
	phantom = require('phantom'),
	ejs = require('ejs');

/* GET home page. */
router.get('/', function (req, res) {
	res.render('resume', {full: false});
});

router.get('/get-full-content', function (req, res) {
	res.render('resume', {full: true});
});

router.get('/pdf', function (req, res) {
	var fileName = 'David S Harris - Software Engineer.pdf';
	phantom.create(function(ph){
		ph.createPage(function(page) {
			page.open("http://dsharris.org/get-full-content", function(status) {
				page.set('paperSize', {
					format: 'A4'
				}, function() {
					page.render(fileName, function(){
						res.download(fileName, fileName);
						ph.exit();

					});
				});
			});
		});
	});
});

module.exports = router;
