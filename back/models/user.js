module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, // 필수
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장

  });
  User.assosiate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' })
    db.User.belongToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' })
  };
  return User;
};