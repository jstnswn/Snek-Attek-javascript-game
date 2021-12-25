'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    score: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Score.associate = function(models) {
    Score.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Score;
};
