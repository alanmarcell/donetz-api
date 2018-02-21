import R from 'ramda';
import config from '../config';
import { getDb, getDbCollection, getConnectedDb } from '../core';
// import { log } from 'ptz-log';
import { createUser } from './Controller';

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
      const db = await getDb(DB_CONNECTION_STRING);

      const UserDb = await getConnectedDb(db, 'donetz_dev');

      const userRepository = await getDbCollection(UserDb, 'users');

      const saveUserArgs = R.merge({
        createdBy: 'self',
      }, args.user);

      const resp = await createUser(userRepository, saveUserArgs);
      return resp;
    },
  },
};

export default resolvers;
export { resolvers };
