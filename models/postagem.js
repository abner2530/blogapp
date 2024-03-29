const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment');

const Postagem = new Schema ({
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    },
    data: {
        type: String,
        default: () => moment().utc().format('MMMM Do YYYY, HH:mm:ss')
    }
})

mongoose.model("postagens", Postagem)