module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    rating_rate: DataTypes.FLOAT,
    rating_count: DataTypes.INTEGER
  }, {
    tableName: 'products',
    timestamps: false
  });
};
