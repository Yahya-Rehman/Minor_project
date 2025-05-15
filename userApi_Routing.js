var express = require('express');
var router = express.Router();
var pool = require('./pool.js');
var upload = require('./multer');


// user Registration 
router.get('/userReg', function (req, res, next) {
    res.render('userRegistration', { msg: '' });
});

// //insert reg data
router.post('/sendCode_inserReg', upload.single('image'), function (req, res, next) {
    pool.query('insert into user_reg(name,lname,contact,gender,address, state,city,email,password,image)values(?,?,?,?,?,?,?,?,?,?)',
        [req.body.name, req.body.lname, req.body.contact, req.body.gender, req.body.address, req.body.state, req.body.city, req.body.email, req.body.password, req.file.originalname], function (error, result) {
            if (error) {
                res.render('userRegistration', { msg: 'Record fail...' });
            }
            else {
                res.render('userLogin', { msg: 'Record Submit Successfully' });
            }
        })

});


// user login 
router.get('/userLogin', function (req, res, next) {
    res.render('userLogin', { msg: '' });
});


// user check login 
router.post('/sendCode_loginchacked', function (req, res, next) {
    pool.query("select * from user_reg where email=? AND password=?",
        [req.body.email, req.body.password],
        function (error, result) {
            if (error) {
                res.render('userlogin', { msg: 'server error' });
            }
            else {
                if (result.length == 0) {
                    res.render('userlogin', { msg: 'invalid email and password' });
                }
                //   else if (result) {
                //     pool.query('select * from latest_news', function (error, result) {
                //       req.session.USER = result[0];
                //       res.render('newsfeed_homePage', { data: result, USER: req.session.USER });
                //     });
                //   }

                else {
                    res.render('userLandingPage', { data: result })

                }
            }
        });
});





// user Main Landing page
router.get('/user_Landingpage', function (req, res, next) {
    res.render('userLandingPage', { msg: '' });
});






// user index page 
router.get('/index', function (req, res, next) {
    res.render('index', { msg: '' });
});


// user blog

router.get('/user_blog', function (req, res, next) {
    res.render('userBlog', { msg: '' });
});

// user courses

router.get('/course.html', function (req, res, next) {
    res.render('userCourses', { msg: '' });
});

// user courses details
router.get('/courses', function (req, res, next) {
    pool.query('SELECT * FROM course_table', function (error, result) {
        if (error) {
            res.send("Error fetching courses");
        } else {
            res.render('courseList', { courseData: result });
        }
    });
});

// user teacher

router.get('/teacher.html', function (req, res, next) {
    res.render('userTeams', { msg: '' });
});

// user join

router.get('/reg_join', function (req, res, next) {
    res.render('userRegistration', { msg: '' });
});

// about

router.get('/about.html', function (req, res, next) {
    res.render('user_about', { msg: '' });
});

// contact

router.get('/contact.html', function (req, res, next) {
    res.render('userContact', { msg: '' });
});

// Blog

router.get('/Blog.html', function (req, res, next) {
    res.render('userBlog', { msg: '' });
});

// Single page Blog

router.get('/single.html', function (req, res, next) {
    res.render('userSingle', { msg: '' });
});

module.exports = router;