mongo = ''
if(process.env.NODE_ENV === 'production'){
    mongo = process.env.mongo
}
else{
    mongo = 'mongodb+srv://cahu_dev:cahu123@cluster0-pfpll.mongodb.net/test?retryWrites=true&w=majority'
}

module.exports = {
    mongo: mongo
}