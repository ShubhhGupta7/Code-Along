module.exports.home  = function(req, res) {
    // console.log(req.cookies);
    // res.cookie('username', 'Muskan Gupta')
    return res.render('home', {
        'title' : 'Home'
    });
}

// module.exports.action_name = function(req, res) {}