if(process.env.NODE_ENV == "production") {
     module.exports = {mongoURI: "mongodb+srv://admin:<KRsPzwvkO4vUYkBU>@abrigo.xoyo2kb.mongodb.net/?retryWrites=true&w=majority"}
} else {
    module.exports = {mongoURI: "mongodb://127.0.0.1:27017/blogapp"}
}