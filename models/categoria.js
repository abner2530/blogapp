const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: () => moment().utc().format('MMMM Do YYYY, HH:mm:ss')
    }
});

mongoose.model("categorias", Categoria);
