require('dotenv').config();
const faunadb = require('faunadb');

const query = faunadb.query;

function createClient() {
  if (!process.env.FAUNADB_SERVER_SECRET) {
    throw new Error(
    `No FAUNADB_SERVER_SECRET in env, skipping client creation`
    );
  }
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  });
  return client;
}

exports.client = createClient();
exports.query = query;

/*
exports.pokemons = [
  { id: 122, name: 'Mr. Mime'},
  { id: 25, name: 'Pikachu'},
  { id: 7, name: 'Squirtle'}
];
*/