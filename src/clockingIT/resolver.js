import R from 'ramda';
import CreateClockingItController from './Controller';

const ClockingItController = CreateClockingItController();

const resolvers = {
  Query: {
    clockingItLogs: () => {
      const { getLogs } = ClockingItController;
      return getLogs();
    },
    // plants: baseResolver.createResolver((root, paging, context) => {
    //   const plantController = new PlantController(context);
    //   return plantController.getAll(null, paging);
    // }),
  },
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
