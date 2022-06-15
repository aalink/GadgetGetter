const router = require('express').Router();
const { Device, User } = require('../models');
const withAuth = require('../utils/auth');

// Route: localhost:3001---showhomepage
router.get('/', withAuth, async (req, res) => {
  try{
    // Get all devices and JOIN with user data
    const deviceData = await Device.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });

    // Serialize data so the template can read it
    const devices = deviceData.map((device) => device.get({ plain: true }));
    // res.status(200).json(devices);
    // Pass serialized data and session flag into template
    //Jessie: If logged in, render homepage, if not, render loginsignup page, this part is done in the front end main.handlebars.
    res.render('homepage', {
      devices,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// router.get('/devices/:id', async (req, res) => {
//   try {
//     const deviceData = await Device.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const device = deviceData.get({ plain: true });

//     res.render('device', {
//       ...device,

//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
//Jessie: we don't have a profile page. Maybe we should build one.
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Device }],
    });

    const user = userData.get({ plain: true });
  
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

//Jessie: since login and signup page are the same, maybe we can just delete this part. 
// router.get('/signup/:id', async (req, res) => {
//   try {
//     if (req.session.logged_in) {
//       res.redirect('/');
//       return;
//     }
//     const userData = await User.findByPk(req.params.id);
//     const user = userData.get({ plain: true });
//     if (!userData) {
//       res
//         .status(404)
//         .json({ message: 'ID not found, please try again' });
//       return;
//     }
//     if (user.isSignedUp === true){
//       res.redirect('/');
//       return
//     }
//       // console.log(user);
//       res.render('signup',{user});
//     } catch (err) {
//     res.status(400).json({message : 'Jodiste'});
//   }
// });

//Note: this route is not working so far
router.get('/rentalAgreement', (req, res) => {
  res.render('rentalAgreement');
})
//note: this route is not working so far
router.get('/finalpage', (req, res) => {
  res.render('finalpage');
})

router.get("/devices", withAuth, async (req, res) => {
  // find all devices
  // be sure to include its associated data
  try{
    // Get all devices and JOIN with user data
    const deviceData = await Device.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });

    // Serialize data so the template can read it
    const devices = deviceData.map((device) => device.get({ plain: true }));
    
    res.render('devices', {
      devices,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/device/:id', async (req, res) => {
  try {
    const deviceData = await Device.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const device = deviceData.get({ plain: true });
    console.log(device);
    res.render('device', {
      device,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/devices/is_available', async (req, res) => {
  try {
    const deviceData = await Device.findAll({
      where: {
        is_available: true,
      }
    });

    const devices = deviceData.map((device) => device.get({ plain: true }));

    res.render('devices', {
      devices, 
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/devices/smartphone', async (req, res) => {
  try {
    const deviceData = await Device.findAll({
      where: {
        device_type: 'Smart Phone',
      }
    });

    const devices = deviceData.map((device) => device.get({ plain: true }));

    res.render('devices', {
      devices, 
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          model: Device,
          attributes: ['name'],
        }
      ]
    });

    const users = userData.map((user) => user.get({ plain: true }));

    res.render('users', {
      users,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;

