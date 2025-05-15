var express = require('express');
var router = express.Router();
var pool = require('./pool.js');
var upload = require('./multer');

// admin Login page... 
router.get('/admin_loginPage', function (req, res, next) {
    res.render('admin_login', { msg: '' });
});


// user check login 
router.post('/admin_loginchacked', function (req, res, next) {
    pool.query("select * from admin_checked where email=? AND password=?",
        [req.body.email, req.body.password],
        function (error, result) {
            if (error) {
                res.render('admin_login', { msg: 'server error' });
            }
            else {
                if (result.length == 0) {
                    res.render('admin_login', { msg: 'invalid email and password' });
                }
                  else if (result) {
                    pool.query('select * from latest_news', function (error, result) {
                      req.session.USER = result[0];
                      res.render('newsfeed_homePage', { data: result, USER: req.session.USER });
                    });
                  }

                else {
                    res.render('adminLandingPage', { data: result })
                }
            }
        });
});


// admin logout api
// router.get('/admin_logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.redirect('/adminLandingPage');
//         }
//         res.redirect('/admin_login');
//     });
// });



// admin landing page... 
router.get('/admin_landingPage', function (req, res, next) {
    res.render('adminLandingPage', { msg: '' });
});


// user display data call Api
router.get('/admin_displayData', function (req, res, next) {
    pool.query('select * from user_reg', function (error, result) {
        // if (!req.session.ADMIN) {
        //   res.render('newsfeed_adminLogin', { msg: '' });
        // }
        // else {
        if (result.length == 0) {
            res.render('admin_tableData', { data: 'Data Not Found' });
        }
        else {
            res.render('admin_tableData', { data: result });
        }

    });
});


// user view details
router.get('/userview_Data', function (req, res, next) {
    pool.query('select * from user_reg where user_id=?', [req.query.u_id], function (error, result) {
        if (error) {
            res.render('user_showViewData', { data: 'server error' });
        }
        else {
            if (result.length == 0) {
                res.render('user_showViewData', { data: 'Record Not Found' });
            }
            else {
                res.render('user_showViewData', { data: result[0] });

            }

        }
    });

});


// user select data
router.get('/userselect_Data', function (req, res, next) {
    pool.query('select * from user_reg where user_id=?', [req.query.edit_id], function (error, result) {
        if (error) {
            res.render('user_selectEditData', { data: 'server error' });
        }
        else {
            res.render('user_selectEditData', { data: result[0] });
        }
    });
});


// Update user data
router.post('/userupdata_Data', function (req, res) {
    const {
        update_id,
        name,
        lname,
        gender,
        contact,
        address,
        state,
        city,
        email,
        password
    } = req.body;

    const updateQuery = `
        UPDATE user_reg 
        SET name=?, lname=? ,gender=?, contact=?, address=?, state=?, city=?, email=?, password=?
        WHERE user_id=?
    `;

    pool.query(updateQuery, [name, lname, gender, contact, address, state, city, email, password, update_id], function (error, result) {
        if (error) {
            console.error('Update Error:', error);
            res.render('user_selectEditData', { data: 'Update failed' });
        } else {
            res.redirect('/admin/admin_displayData');
        }
    });
});


// user delete Data call API
router.get('/userdelete_Data', (req, res) => {
    const userId = req.query.edit_id;

    pool.query('DELETE FROM user_reg WHERE user_id = ?', [userId], function (error, result) {
        if (error) {
            console.error(error);
        } else {
            console.log("Deleted user with ID:", userId);
        }
        res.redirect('/admin/admin_displayData');
    });
});



// update image api call
router.post('/userupdate_Image', upload.single('image'), function (req, res, next) {
    pool.query('update user_reg set image=? where user_id=?', [req.file.originalname, req.body.edit_image], function (error, result) {
        if (error) {
            res.redirect('/admin/admin_displayData');
        }
        else {
            res.redirect('/admin/admin_displayData');
        }
    });
});

// user total user, male and female api call
router.get('/user_genderStatus', function (req, res) {
    pool.query(`
      SELECT 
        COUNT(*) AS total_users,
        SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS total_male,
        SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) AS total_female
      FROM user_reg
    `, function (error, results) {
        if (error) {
            console.error("🔥 Error in /user_genderStatus:", error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
        res.json(results[0]);
    });
});



// file1 reactjs data insert course data api 
router.get('/file1_courseDataAPI', function (req, res, next) {
    res.render('file1_ReactData', { msg: '' });
});



router.post('/file1_sendCourseInsert', upload.fields([
    { name: 'ppt', maxCount: 1 },
    { name: 'zipfile', maxCount: 1 }
]), function (req, res, next) {
    const ct_id = req.body.course_name;  // this will now be ct_id
    const topic = req.body.topic;
    const pptFile = req.files['ppt'] ? req.files['ppt'][0].filename : null;
    const zipFile = req.files['zipfile'] ? req.files['zipfile'][0].filename : null;

    pool.query('INSERT INTO course_file1reactjs (ct_id, topic, ppt, zipfile) VALUES (?, ?, ?, ?)',
        [ct_id, topic, pptFile, zipFile], function (error, result) {
            if (error) {
                console.log(error);
            }
            res.render('file1_ReactData', { msg: 'Record inserted successfully!' });
            // fetch joined table after insert
            pool.query(`SELECT course_file1reactjs.*, course_table.course_name 
                        FROM course_file1reactjs
                        JOIN course_table ON course_file1reactjs.ct_id = course_table.ct_id`,
                function (error, result) {
                    if (error) {
                        console.log(error);
                    }
                    if (result.length == 0) {
                        res.render('file1_ReactData', { data: 'Data Not Found' });
                    } else {
                        res.render('file1_ReactData', { data: result });
                    }
                });
        });
});


// Create this new route in your backend
router.get('/getAllCourses', function (req, res) {
    pool.query('SELECT * FROM course_table', function (error, result) {
        if (error) {
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(result); // sending the data as JSON
    });
});


// add couser data api
router.get('/admin_addNotesData', function (req, res, next) {
    res.render('admin_addNotes', { msg: '' });
});



// insert course data API
router.post('/admin_addNotesDatadetails', upload.single('course_file'), function (req, res, next) {
    pool.query(
        'INSERT INTO course_table (course_name, course_img) VALUES (?, ?)',
        [req.body.course_name, req.file.originalname],
        function (error, result) {
            if (error) {
                console.error(error);
                res.render('admin_addNotes', { msg: 'Record failed...' });
            } else {
                res.render('admin_addNotes', { msg: 'Record Submitted Successfully' });
            }
        }
    );
});




// Chart data api
router.get('/admin_chartData', function (req, res, next) {
    res.render('admin_chartDetails', { msg: '' });
});


// Get gender count
router.get('/gender-count', (req, res) => {
    const sql = `SELECT gender, COUNT(*) as count FROM user_reg GROUP BY gender`;
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});


// Get course name count
router.get('/course-count', (req, res) => {
    const sql = `SELECT course_name, COUNT(*) as count FROM course_table GROUP BY course_name`;
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});




// Current Event Data api
router.get('/admin_currentEventData', function (req, res, next) {
    res.render('admin_currentEvent', { msg: '' });
});

// //insert current event data api
router.post('/insert_currentevent', function (req, res, next) {
    pool.query('insert into current_event(discription,link)values(?,?)',
        [req.body.discription, req.body.link], function (error, result) {
            if (error) {
                res.render('admin_addNotes', { msg: 'Record fail...' });
            }
            else {
                res.render('admin_addNotes', { msg: 'Record Submit Successfully' });
            }
        })

});


// Current Post Blog Data api
router.get('/admin_currentpostBlogData', function (req, res, next) {
    res.render('admin_currentpostBlog', { msg: '' });
});

// //insert Current Post Blog data api
router.post('/insert_currentpostblog', upload.single('blog_img'), function (req, res, next) {
    pool.query('insert into current_postblog(discription, blog_img, blog_date)values(?,?,?)',
        [req.body.discription, req.file.originalname, req.body.blog_date], function (error, result) {
            if (error) {
                res.render('admin_currentpostBlog', { msg: 'Record fail...' });
            }
            else {
                res.render('admin_currentpostBlog', { msg: 'Record Submit Successfully' });
            }
        })

});


// Recent Post Data api
router.get('/admin_recentPostData', function (req, res, next) {
    res.render('admin_recentPost', { msg: '' });
});


// //insert Recent Post Blog data api
router.post('/insert_recentpost', upload.single('recentPost_img'), function (req, res, next) {
    pool.query('insert into recent_post(discription, recentPost_img, recent_blog_date)values(?,?,?)',
        [req.body.discription, req.file.originalname, req.body.recent_blog_date], function (error, result) {
            if (error) {
                res.render('admin_recentPost', { msg: 'Record fail...' });
            }
            else {
                res.render('admin_recentPost', { msg: 'Record Submit Successfully' });
            }
        })

});


// Teacher Data api
router.get('/admin_teacherData', function (req, res, next) {
    res.render('admin_teacherform', { msg: '' });
});


// //insert Teacher data api
router.post('/insert_teacherform', upload.single('T_img'), function (req, res, next) {
    pool.query('insert into teachers_table(T_FullName, T_Designation, T_img,)values(?,?,?)',
        [req.body.T_FullName, req.file.originalname, req.body.T_designation], function (error, result) {
            if (error) {
                res.render('admin_teacherform', { msg: 'Record fail...' });
            }
            else {
                res.render('admin_teacherform', { msg: 'Record Submit Successfully' });
            }
        })

});

// Slider Data api
router.get('/admin_sliderData', function (req, res, next) {
    res.render('admin_slider', { msg: '' });
});


// //insert Slider data api
router.post('/insert_sliderform', upload.single('slider_img'), function (req, res, next) {
    pool.query('insert into teachers_table(slider_discription, T_img,)values(?,?)',
        [req.body.slider_discription, req.file.originalname], function (error, result) {
            if (error) {
                res.render('admin_slider', { msg: 'Record fail...' });
            }
            else {
                res.render('admin_slider', { msg: 'Record Submit Successfully' });
            }
        })

});



module.exports = router;