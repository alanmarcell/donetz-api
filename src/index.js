import Hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import { makeExecutableSchema } from 'graphql-tools';
import { Engine } from 'apollo-engine';
// import UserApp from 'ptz-user-app';
import config from './config';

import { typeDefs } from './users/schema';
import { resolvers } from './users/resolver';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const engine = new Engine({
  engineConfig: {
    apiKey: config.optics.api_key,
  },
  graphqlPort: config.server.port,
});

async function StartServer() {
  const server = new Hapi.Server({
    port: config.server.port,
  });

  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql',
      },
    },
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema,
        tracing: true,
        cacheControl: true,
      },
      route: {
        cors: true,
      },
    },
  });

  try {
    await server.start();

    engine.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();
