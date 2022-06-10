const router = require('express').Router();
const { User } = require('../../../models');

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { id: req.params.id } });
    const user = userData.get({ plain: true });
    if (!user) {
      res
        .status(404)
        .json({ message: 'ID not found, please try again' });
      return;
    }
    if (user.signedUp){
      res.status(400).json({ message: 'User already signed up, Log in' });
      return;
    }
      console.log(user);
      res.render('sign-up', {user} );
    } catch (err) {
    res.status(400).json(err);
  }
});