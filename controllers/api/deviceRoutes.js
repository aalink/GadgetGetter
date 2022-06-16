const router = require('express').Router();
const { Device, User } = require('../../models');
const withAuth = require('../../utils/auth');

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


//api/devices/:id
// router.get("/:id", (req, res) => {
//   // find a single device by its `id`
//   Device.findByPk(req.params.id, {})
//     .then((device) => res.json(device))
//     .catch((err) => res.status(400).json(err));
// });

//THIS ROUTE IS NOT WORKING PROPERLY.
//ROUTE: api/devices/id
router.put('/:id', async (req, res) => {
  try {
    const deviceData = await Device.update(req.body, {
      where: [
        {
          id: req.params.id,
        },
      ],
    });

    if (deviceData){
      res.status(200).json({message: 'Updated Succesfuly'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// api/devices/is_available--------NOT WORKING yet
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
