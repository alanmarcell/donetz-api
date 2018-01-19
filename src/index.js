import Hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import { makeExecutableSchema } from 'graphql-tools';
import { Engine } from 'apollo-engine';
import config from './config';

const HOST = 'localhost';
const PORT = 3003;
const todos = [
  {
    title: "Create a Todo App",
    author: 'Polutz',
    id: 1,
  },
  {
    title: 'Create a Todo in this app',
    author: 'Alan Marcell',
    id: 2,
  },
];
const typeDefs = `
  type Query { todos: [Todo] }
  type Todo { title: String!, author: String!, id:ID! }
`;

// The resolvers
const resolvers = {
  Query: { todos: () => todos },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const engine = new Engine({
  engineConfig: {
    apiKey: config.optics.api_key,
    logging: {
      level: 'DEBUG'   // Engine Proxy logging level. DEBUG, INFO, WARN or ERROR
    }
  },
  graphqlPort: config.server.port
});

async function StartServer() {
  const server = new Hapi.server({
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
        cacheControl: true
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