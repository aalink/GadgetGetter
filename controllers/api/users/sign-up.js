const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../../models');

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    const user = userData.get({ plain: true });
    // console.log(userData);
    if (!userData) {
      res
        .status(404)
        .json({ message: 'ID not found, please try again' });
      return;
    }
    if (user.isSignedUp === true){
      res.status(400).json({ message: 'User already signed up, please log in' });
      return;
    }
      // console.log(user);
      res.render('sign-up',{user});
    } catch (err) {
    res.status(400).json({message : 'Jodiste'});
  }
});

router.put('/:id', async (req,res) => {
  try {
    // let pass;
    console.log('jelou');
    // console.log(req.body);
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log('test');
    const userData = await User.update(req.body,
      {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    });
    console.log(userData);
    if(userData){
      const dataSession = await User.findByPk(req.params.id);
      // const dataSession = sessionData.get({ plain: true });
      console.log(dataSession);
      req.session.save(() => {
        req.session.user_id = dataSession.id;
        req.session.logged_in = true;
        res.status(200).json({ user: dataSession, message: 'You are now logged in!' });
      });
    }
    console.log('adioh');

    // console.log(userData);
    // if (userData){
    //   const userSess = await User.findByPk(req.params.id);
    //   const userSe = userSess.get({ plain: true });

    //   req.session.save(() => {
    //     req.session.user_id = userSe.id;
    //     req.session.logged_in = true;
        
    //     res.json({ user: userSe, message: 'You are now logged in!' });
    //   });
    // }
  } catch (error){
    res.status(500).json(error);
  }
});

// router.put('/:id', async (req, res) => {
//   try {
//     const userData = await User.update({
//       email: req.body.email,
//       password: req.body.password,
//       isSignedUp: req.body.isSignedUp,
//     },{ where: { id: req.params.id, }, individualHooks: true });
//     // const user = userData.get({ plain: true });
//     console.log(userData)
//     if (userData){
//       res.status(200).json({message: 'Eureka'});
//     }
    // console.log(user)
    // console.log(userData)
    // const userData2 = await User.findOne({ where: { id: req.params.id } });
    // const user2 = userData.get({ plain: true });
    // req.session.save(() => {
    //   req.session.user_id = user2.id;
    //   req.session.logged_in = true;
      
    //   res.status(200).json({ session: req.session.logged_in, user: user2, message: 'You are now logged in!' });
    // });
//     } catch (err) {
//     res.status(400).json({message: 'Jodiste'});
//   }
// });
module.exports = router;