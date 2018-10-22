const bcrypt = require('bcrypt');

module.exports = function(app, db) {
    app.post('/users', (req, res) => {
        const user = {
            login: req.body.login,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };

        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) {
                return err;
            } else {
                user.password = hash;
                db.collection('users').insert(user, (err, result) => {
                    if (err) {
                        res.send({ 'error': 'An error has occurred' });
                    } else {
                        res.send(result.ops[0]);
                    }
                });
            }
        });
    });

    app.get('/userLogins/:login', (req, res) => {
        const login = req.params.login;
        const details = { "login": login };

        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                if (item) {
                    res.send({ 'error': true })
                } else {
                    res.send({ 'error': false })
                }
            }
        });
    });

    app.post('/userLogin', (req, res) => {
        const login = req.body.login;
        const password = req.body.password;
        const details = { "login": login };

        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                if (item) {
                    bcrypt.compare(password, item.password, function(err, result) {
                        if (result) {
                            res.send({'error': false});
                        } else {
                            res.send({'error': true});
                        }
                    });
                } else {
                    res.send({'error': true});
                }
            }
        });
    });
};