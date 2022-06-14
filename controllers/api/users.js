const router = require('express').Router();
const { User, Device } = require('../../models');
const withAuth = require('../../utils/auth');


//////////////////////////////////////////
//Route: api/users/----NOT WORKING

// router.get('/', async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       include: [
//         {
//           model: Device,
//           attributes: ['name'],
//         }
//       ]
//     });

//     const users = userData.map((user) => user.get({ plain: true }));

//     res.render('users', {
//       ...users,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }  

router.get("/:id", (req, res) => {
  // find a single user by its `id`
  User.findByPk(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
});

//NOT working yet
router.get('/admins', (req, res) => {
  const userData = User.findAll({
    where: {
      type: admin
    }
  }).then((userData) => {
    res.json(userData);
  })

  if(!userData) {
    res.status(400).json({ message: 'No user data was found with this condition.'});
    return;
  } else {
    res.render('users', userData);
  }
});

router.get('/teachers', (req, res) => {
  User.findAll({
    where: {
      type: teacher
    }
  }).then((userData) => {
    res.json(userData);
  })
});

router.get('/students', (req, res) => {
  User.findAll({
    where: {
      type: student
    }
  }).then((userData) => {
    res.json(userData);
  })
});


// Sign Up of a new user (available for users and admins)


router.post('/', async (req,res) => {
  try {
    const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.status(200).json({ user: userData, message: 'You are now logged in!' });
      });
  } catch (error){
    res.status(500).json(error);
  }
});

// Adding a new user to the db (available only for admins)
router.post('/add', withAuth, async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
