const sequelize = require('../config/connection');
const { User, Device } = require('../models');

const userData = require('./userData.json');
const deviceData = require('./deviceData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const device of deviceData) {
    await Device.create({
      ...device,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
