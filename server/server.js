const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(
    'mongodb://20245744_db_user:Hpa9GudHyLAzl0zs@ac-vsexxzh-shard-00-00.xirgden.mongodb.net:27017,ac-vsexxzh-shard-00-01.xirgden.mongodb.net:27017,ac-vsexxzh-shard-00-02.xirgden.mongodb.net:27017/contact?ssl=true&replicaSet=atlas-4a8jrb-shard-0&authSource=admin&appName=contact'
  )
  .then(() => {
    console.log('MongoDB Connected Successfully');
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
  });

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Contact = mongoose.model(
  'Contact',
  contactSchema,
  'contact'
);


app.post('/api/contact', async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact submitted successfully',
      contact,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


app.get('/api/contact', async (req, res) => {
  try {
    const messages = await Contact.find().sort({
      createdAt: -1,
    });

    res.json(messages);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: 'Failed to fetch messages',
    });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Message deleted',
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: 'Failed to delete message',
    });
  }
});


app.listen(5000, () => {
  console.log(' Server running on port 5000');
});