const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // 'name' is required
    validate: {
      validator: (value)=> {
        return /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/.test(value) && value.length >= 6 && value.length <= 25 && !/\s{2,}/.test(value);
      },
      message: 'El nombre fue invalido',
    },
  },
  email: {
    type: String,
    required: true, // 'email' is required
    validate: {
      validator: (value)=> {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(value);
      },
      message: 'Email inválido.',
    },
  },
  password: {
    type: String,
    required: true, // 'password' is required
    validate: {
      validator:  (value)=> {
        return value.length >= 8 && /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value);
      },
      message: 'La contraseña fue invalida',
    },
  },
  adress: Array,
  buys: Array,
  img:String
}, {
  collection: 'Users',
});

module.exports = mongoose.model('Users', wineSchema);
