import { createUserRepository } from 'ptz-user-repository';
import {
  authUser,
  cDecode, cEncode, getAuthToken, saveUser, findUsers, tokenSecret, verifyAuthToken,
} from 'ptz-user-app';
import config from '../config';

const DB_CONNECTION_STRING = config.database.connectionString;
const todos = [
  {
    title: 'Create a Todo App',
    author: 'Polutz',
    id: 1,
  },
  {
    title: 'Create a Todo in this app',
    author: 'Alan Marcell',
    id: 2,
  },
];

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    createUser: async (root, args) => {
      const userRepository = await createUserRepository(DB_CONNECTION_STRING, 'users');

      const saveUserArgs = {
        userArgs: args.input,
        authedUser: 'user',
      };

      const resp = await saveUser({ userRepository }, saveUserArgs);

      return resp;
    },
  },
};

export default resolvers;
export { resolvers };
