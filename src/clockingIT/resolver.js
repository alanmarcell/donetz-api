import R from 'ramda';
import CreateClockingItController from './Controller';

const ClockingItController = CreateClockingItController();

const resolvers = {
  Query: {
    clockingItLogs: (root, { ...paging }, _context) => {      
      const { getLogs } = ClockingItController;
      return getLogs(null, paging);
    },
    clockingWeekLog: async (root, args, _context) => {

      const { getWeekLog } = ClockingItController;

      const report = await getWeekLog(args);
      // console.log('REPORT\n\n', report, '\n\n')
      return report;
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
    updateClockingItLog: (root, args) => {
      const { createLog } = ClockingItController;

      const saveLogArgs = R.merge({
        createdBy: 'self',
      }, args.log);

      return createLog(saveLogArgs);
    },
    syncClockingItLog: (root, args) => {
      const { syncLog } = ClockingItController;

      return syncLog(args.log);
    },
  },
};

export default resolvers;
export { resolvers };
