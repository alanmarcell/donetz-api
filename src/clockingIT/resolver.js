import R from 'ramda';
import CreateClockingItController from './Controller';

const ClockingItController = CreateClockingItController();

const resolvers = {
  Mutation: {
    createClockingItLog: (root, args) => {
      const { createLog } = ClockingItController;

      const saveLogArgs = R.merge({
        createdBy: 'self',
      }, args.log);

      return createLog(saveLogArgs);
    },
  },
};

export default resolvers;
export { resolvers };
