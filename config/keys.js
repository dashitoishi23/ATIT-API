let mongo = ''
let secret = ''
if(process.env.NODE_ENV === 'production'){
    mongo = process.env.mongo
    secret = process.env.secret
}
else{
    mongo = 'mongodb+srv://cahu_dev:cahu123@cluster0-pfpll.mongodb.net/test?retryWrites=true&w=majority'
    secret = 'secret'
}

module.exports = {
    mongo: mongo,
    secret: secret
}