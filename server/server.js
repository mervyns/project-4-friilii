const express = require('express')
const {
    ApolloServer
} = require('apollo-server-express')
const ApolloClient, {createNetworkInterface} = require('apollo-client';)
const {
    graphqlExpress,
    graphiqlExpress,
  } = require('graphql-server-express');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('graphql-tools');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const context = require('./schema/context');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { PubSub } = require('graphql-subscriptions');


const APP_PORT = process.env.PORT || 4000;
const app = express();

const pubsub = new PubSub();
const CHAT_SUBSCRIPTION_TOPIC = 'newChats';

dotenv.config()

// Connection to mLab Database
mongoose.connect(process.env.MLAB_URI, {
    useNewUrlParser: true
})
mongoose.connection.once('open', () => {
    console.log('Connected to mLab')
})

app.use(cors());
const schema = makeExecutableSchema({ typeDefs, resolvers });

// apollo server
const server = new ApolloServer({
    schema,
    context
});

server.applyMiddleware({
    app
});



const ws = createServer(app);
ws.listen(5000, () => {
  console.log('Go to http://localhost:5000/graphiql to run queries!');

  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema}))
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:5000/subscriptions`
  }));

app.listen(APP_PORT, () => {
    console.log(`App is now running on http: //localhost:${APP_PORT}`)
});