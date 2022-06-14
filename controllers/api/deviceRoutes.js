const router = require('express').Router();
const { Device, User } = require('../../models');
const withAuth = require('../../utils/auth');

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//api/devices
router.get("/", withAuth, async (req, res) => {
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

//api/devices/:id
// router.get("/:id", (req, res) => {
//   // find a single device by its `id`
//   Device.findByPk(req.params.id, {})
//     .then((device) => res.json(device))
//     .catch((err) => res.status(400).json(err));
// });

//THIS ROUTE IS NOT WORKING PROPERLY.
router.get('/:id', async (req, res) => {
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

    res.render('device', {
      ...device,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//api/devices/is_available--------NOT WORKING yet
// router.get('/:is_available', async (req, res) => {
//   try {
//     const deviceData = await Device.findAll({
//       where: {
//         is_available: true,
//       }
//     });

//     const devices = deviceData.map((device) => device.get({ plain: true }));

//     res.render('devices', {
//       devices, 
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

/////WANTED TO ADD SEARCH FOR A CERTAIN TYPE, BUT NOT SO SURE YET.

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

router.post('/', withAuth, async (req, res) => {
  try {
    const newDevice = await Device.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newDevice);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deviceData = await Device.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deviceData) {
      res.status(404).json({ message: 'No device found with this id!' });
      return;
    }

    res.status(200).json(deviceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
