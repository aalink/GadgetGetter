const router = require('express').Router();
const { Device } = require('../../models');
const withAuth = require('../../utils/auth');

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

router.get("/", (req, res) => {
  // find all devices
  // be sure to include its associated data
  Device.findAll({})
    .then((devices) => res.json(devices))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  // find a single device by its `id`
  Device.findByPk(req.params.id, {})
    .then((device) => res.json(device))
    .catch((err) => res.status(400).json(err));
});

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
