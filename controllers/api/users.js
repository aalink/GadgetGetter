const router = require('express').Router();
const { response } = require('express');
const { User, Device } = require('../../models');
const withAuth = require('../../utils/auth');




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
    let isAdmin = false;
    let isTeacher = false;
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
    console.log(userData);
    if (userData.type === 'admin'){
      isAdmin = true;
    } else if (userData.type === 'teacher'){
      isTeacher = true;
    }
    console.log(isAdmin);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.isAdmin = isAdmin
      req.session.isTeacher = isTeacher

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

router.delete("/:id", withAuth, async (req, res) => {
  try{
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Device }],
    });
    userData.destroy();
    response.status(200).json({message: 'User deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
