import Hapi from 'hapi';
import { graphqlHapi } from 'apollo-server-hapi';
import { makeExecutableSchema } from 'graphql-tools';

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


async function StartServer() {
  const server = new Hapi.server({
    host: HOST,
    port: PORT,
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema,
      },
      route: {
        cors: true,
      },
    },
  });

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();