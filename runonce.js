// This file was run once (using node) to populate the fauna database
// Be sure to install node-fetch first!

const fetch = require('node-fetch');
const { client, query } = require('./functions/graphql/db.js');
const q = query;
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon?limit=151';

fetch(pokeAPI)
  .then(res => res.json())
  .then(res => {
    const pokemonArr = res.results.map((pokemon, index) => ({
      id: index + 1,
      name: pokemon.name
    }));

    client
      .query(
        q.Map(
          pokemonArr,
          q.Lambda(
            'pokemon',
            q.Create(q.Collection('Pokemon'), { data: q.Var('pokemon') })
          )
        )
      )
      .then(console.log('wrote Pokemon to FaunaDB'))
      .catch(error => console.log('Failed to save Pokemon to FaunaDB', error));
  });