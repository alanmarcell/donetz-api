import R from 'ramda';
import CreateRescueTimeController from './Controller';

const ClockingItController = CreateRescueTimeController();

const resolvers = {
  Query: {
    rescueTimeDailyReports: async (root, { ...paging }, _context) => {
      const { getRescueTimeDailyReports } = ClockingItController;

      const report = await getRescueTimeDailyReports(null, paging);

      return report;
    },
    rescueTimeDailyReport: async (root, args, _context) => {

      const { getRescueTimeDailyReport } = ClockingItController;

      const report = await getRescueTimeDailyReport(args);
      // console.log('REPORT\n\n', report, '\n\n')
      return report;
    },
    rescueTimeActivity: async (root, args, _context) => {

      const { getRescueTimeDailyReport } = ClockingItController;

      const report = await getRescueTimeDailyReport(args);
      // console.log('REPORT\n\n', report, '\n\n')
      return report;
    },
    rescueTimeActivities: async (root, args, _context) => {

      const { getRescueTimeActivities } = ClockingItController;

      const report = await getRescueTimeActivities(args);
      // console.log('REPORT\n\n', report, '\n\n')
      return report;
    },
  },
};

export default resolvers;
export { resolvers };
