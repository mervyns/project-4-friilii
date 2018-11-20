const express = require('express')
const {
    ApolloServer
} = require('apollo-server-express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const context = require('./schema/context');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');


const APP_PORT = process.env.PORT || 4000;
const app = express();

dotenv.config()

// Connection to mLab Database
mongoose.connect(process.env.MLAB_URI, {
    useNewUrlParser: true
})
mongoose.connection.once('open', () => {
    console.log('Connected to mLab')
})

app.use(cors());

// apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});

server.applyMiddleware({
    app
});

app.listen(APP_PORT, () => {
    console.log(`App is now running on http: //localhost:${APP_PORT}`)
});