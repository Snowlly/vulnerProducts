const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const { Sequelize, DataTypes, Op } = require('sequelize');

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.db'),
  logging: false, 
});


const Product = require('./models/Product')(sequelize, DataTypes);
const User = require('./models/User')(sequelize, DataTypes);



sequelize.sync({ force: false, alter: false })
  .then(() => console.log('Database synced without dropping tables'))
  .catch(err => console.error('Sync error:', err));



app.get('/products/search', async (req, res) => {
  const q = req.query.q || '';
  try {
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } },
          { category: { [Op.like]: `%${q}%` } },
        ],
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/test-products', async (req, res) => {
  try {
    const products = await Product.findAll({ limit: 5 });
    console.log('First 5 products:', products.map(p => p.toJSON()));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route racine
app.get('/', (req, res) => {
  res.send('Hello Ipssi v2!');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
