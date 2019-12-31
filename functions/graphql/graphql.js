const { ApolloServer } = require('apollo-server-lambda');
const { typeDefs } = require('./schema.js');
const { resolvers } = require('./resolvers.js');
const { client, query } = require('./db.js');




const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: function() {
    return { client, query };
  },
  playground: true,
  introspection: true
});

exports.handler = server.createHandler();

