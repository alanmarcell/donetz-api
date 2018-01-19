import Hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import { makeExecutableSchema } from 'graphql-tools';
import { Engine } from 'apollo-engine';
import { createUserRepository } from 'ptz-user-repository';
// import UserApp from 'ptz-user-app';
import config from './config';
import {
  authUser,
  cDecode, cEncode, getAuthToken, saveUser, findUsers, tokenSecret, verifyAuthToken
} from 'ptz-user-app';

const DB_CONNECTION_STRING = config.database.connectionString

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
  type Query {
    todos: [Todo]
  }
  type Todo { title: String!, author: String!, id:ID! }

  type User {
    id: ID
    userName: String!
    email: String!,
    displayName: String
  }

  input CreateUserInput {
    id: ID
    userName: String!
    email: String!,
    displayName: String,
    password: String!
  }
  
  type Mutation {
    createUser(input: CreateUserInput): User
  }
`;


const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    createUser: async (root, args) => {
      const userRepository = await createUserRepository(DB_CONNECTION_STRING, 'users');

      const saveUserArgs = {
        userArgs: args.input,
        authedUser: 'user'
      };

      const resp = await saveUser({ userRepository }, saveUserArgs)

      return resp;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const engine = new Engine({
  engineConfig: {
    apiKey: config.optics.api_key,
  },
  graphqlPort: config.server.port
});

async function StartServer() {
  const userRepository = await createUserRepository(DB_CONNECTION_STRING, 'users');

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