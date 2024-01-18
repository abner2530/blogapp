// Carregando módulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
require("./models/postagem");
const Postagem = mongoose.model("postagens");
require("./models/categoria");
const Categoria = mongoose.model("categorias");
const usuarios = require("./routes/usuario")
const passport = require("passport")
require("./config/auth")(passport)
const db = require("./config/db")


// Configurações
// Sessão
app.use(
  session({
    secret: "cursodenode",
    resage: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

// Midldleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error")
  res.locals.user = req.user || null
  next();
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

// Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(db.mongoURI)
  .then(() => {
    console.log("Conectado ao Banco!");
  })
  .catch((erro) => {
    console.log("Erro ao conectar ao Banco " + erro);
  });

//Public
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.get("/", (req, res) => {
  Postagem.find()
    .populate("categoria")
    .sort({ data: "desc" })
    .then((postagens) => {
      res.render("index", { postagens: postagens });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/404");
    });
});

app.get("/postagem/:slug", (req, res) => {
  Postagem.findOne({ slug: req.params.slug })
    .then((postagem) => {
      if (postagem) {
        res.render("postagem/index", { postagem: postagem });
      } else {
        req.flash("error_msg", "Está postagem não existe");
        res.redirect("/");
      }
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/");
    });
});

app.get("/categorias", (req, res) => {
  Categoria.find()
    .then((categorias) => {
      res.render("categoria/index", { categorias: categorias });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao listar as categorias");
      res.redirect("/");
    });
});

app.get("/categorias/:slug", (req, res) => {
  Categoria.findOne({ slug: req.params.slug })
    .then((categoria) => {
      if (categoria) {
        Postagem.find({ categoria: categoria._id })
          .then((postagens) => {
            res.render("categoria/postagens", {
              postagens: postagens,
              categoria: categoria,
            });
          })
          .catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar os posts!");
            res.redirect("/");
          });
      } else {
        req.flash("error_msg", "Está categoria não existe");
        res.redirect("/");
      }
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao listar as categorias");
      res.redirect("/");
    });
});

app.get("/404", (req, res) => {
  res.send("Error 404");
});

app.use("/usuarios", usuarios)
app.use("/admin", admin);

app.get("/posts", (req, res) => {
  res.send("Lista de Posts");
});

// Outros
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando em localhost:" + PORT);
});
