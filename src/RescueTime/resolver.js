import R from 'ramda';
import CreateRescueTimeController from './Controller';

const ClockingItController = CreateRescueTimeController();

const resolvers = {
  Query: {
    rescueTimeDailyReports: async (root, { ...paging }, context) => {
      console.log('pagging', paging)
      const { getRescueTimeDailyReports } = ClockingItController;

      const report = await getRescueTimeDailyReports(null, paging)
      console.log('report', report)
      return report;
    },
    rescueTimeDailyReport: async (root,args, context) => {
      console.log('pagging', args)
      const { getRescueTimeDailyReport } = ClockingItController;

      const report = await getRescueTimeDailyReport(args)
      console.log('report', report)
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
  },
};

export default resolvers;
export { resolvers };
