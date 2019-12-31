const { ApolloServer } = require('apollo-server-lambda');
const { typeDefs } = require('./schema.js');
const { resolvers } = require('./resolvers.js');
const { pokemons } = require('./db.js');




const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: function() {
    return { db: pokemons };
  },
  playground: true,
  introspection: true
});

exports.handler = server.createHandler();

