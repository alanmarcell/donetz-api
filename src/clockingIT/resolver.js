import R from 'ramda';
import CreateClockingItController from './Controller';

const ClockingItController = CreateClockingItController();

const resolvers = {
  Query: {
    clockingItLogs: (root, { ...paging }, context) => {
      console.log('pagging', paging)
      console.log('context', context)
      const { getLogs } = ClockingItController;
      return getLogs(null, paging);
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
