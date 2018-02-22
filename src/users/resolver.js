import R from 'ramda';
// import { log } from 'ptz-log';
import CreateUserController from './Controller';

const UserController = CreateUserController();

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
    createUser: (root, args) => {
      const { createUser } = UserController;

      const saveUserArgs = R.merge({
        createdBy: 'self',
      }, args.user);

      return createUser(saveUserArgs);
    },
  },
};

export default resolvers;
export { resolvers };
