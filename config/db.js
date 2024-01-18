if(process.env.NODE_ENV == "production") {
     module.exports = {mongoURI: "https://twfqyvnsfaujlttcmtkh.supabase.co"}
} else {
    module.exports = {mongoURI: "mongodb://127.0.0.1:27017/blogapp"}
}