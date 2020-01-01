exports.resolvers = {
  Query: {
    hello: (obj, args, context) => {
      return 'Hello, FaunaDB world!';
    },
    allPokemon: (obj, args, context) => {
      const { client, query: q } = context;
      return client
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index('allPokemon')), {
              size: 256
            }),
            q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
          )
        )
        .then(result => result.data);
    },
    pokemonById: (obj, args, context) => {
      const { client, query: q } = context;
      return client
        .query(q.Get(q.Match(q.Index('PokemonById'), args.id)))
        .then((result) => result.data);
    },
    pokemonByName: (obj, args, context) => {
      const { client, query: q } = context;
      return client
        .query(q.Get(q.Match(q.Index('pokemonByName'), args.name)))
        .then(result => result.data);
    }
  },
  Mutation: {
    createPokemon: (obj, args, context) => {
      const { client, query: q } = context;
      return client
        .query(
          q.Create(q.Collection('Pokemon'), {
            data: { id: args.id, name: args.name }
          })
        )
        .then(result => result.data);
    },
    updatePokemon: (obj, args, context) => {
      const { client, query: q } = context;
      return client
        .query(
          q.Update(
            q.Select(['ref'], q.Get(q.Match(q.Index('PokemonById'), args.id))),
            { data: { name: args.name } }
          )
        )
        .then(result => result.data);
    },
    deletePokemon: (obj, args, context) => {
      const { client, query: q } = context;
      return client
        .query(
          q.Delete(
            q.Select(['ref'], q.Get(q.Match(q.Index('PokemonById'), args.id)))
          )
        )
        .then(result => result.data);
    }
  },
  Pokemon: {
    isVeryBest: (obj, args, context) => {
      // is it Mr. Mime?
      return obj.id === 122;
    }
  }
};