import { createUserRepository } from 'ptz-user-repository';
import {
  authUser,
  cDecode, cEncode, getAuthToken, saveUser, findUsers, tokenSecret, verifyAuthToken,
} from 'ptz-user-app';
import config from '../config';

import { save, getDb, getDbCollection, getConnectedDb } from '../core';

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


      const db = await getDb(DB_CONNECTION_STRING)

      const UserDb = await getConnectedDb(db, 'donetz_dev');

      console.log(' --- UserDb --- ', UserDb)
      const userRepository = await getDbCollection(UserDb, 'users');

      const saveUserArgs = {
        userArgs: args.input,
        authedUser: 'user',
      };

      console.log(' --- userRepository --- ', userRepository)
      const resp = await save(userRepository, saveUserArgs);

      return resp;
    },
  },
};

export default resolvers;
export { resolvers };
