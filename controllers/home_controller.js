module.exports.home  = function(req, res) {

    return res.render('home', {
        'title' : 'Home'
    });
}

// module.exports.action_name = function(req, res) {}