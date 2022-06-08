const sequelize = require('../config/connection');
const { User, Device } = require('../models');

const userData = require('./userData.json');
const deviceData = require('./deviceData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Device.bulkCreate(deviceData, {
    returning: true,
  })


  //Note: I don't think we can use random number to assign the user_id, as some devices are available, some are not. I've hard coded some of the user_id in the database

  // for (const device of deviceData) {
  //   await Device.create({
  //     ...device,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
