if(process.env.NODE_ENV == "production") {
     module.exports = {mongoURI: "mongodb+srv://mongodb:123@blogapp.80rp2as.mongodb.net/?retryWrites=true&w=majority"}
} else {
    module.exports = {mongoURI: "mongodb://127.0.0.1:27017/blogapp"}
}