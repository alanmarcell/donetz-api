import {
  getCollection,
  find,
  save,
} from '../core';

const getRescueTimeDailyCollection = getCollection('rescue_time_daily');
const getRescueTimeActivitiesCollection = getCollection('rescue_time_activities');

const CrateRescueTimeRepositoryRepository = async () => {
  const RescueTimeDailyCollection = await getRescueTimeDailyCollection;
  const RescueTimeActivitiesCollection = await getRescueTimeActivitiesCollection;

  const saveActivity = save(RescueTimeActivitiesCollection);
  const getDailyLog = find(RescueTimeDailyCollection);

  return {
    getDailyLog,
    saveActivity,
    RescueTimeActivitiesCollection,
    RescueTimeDailyCollection,
  };
};
export default CrateRescueTimeRepositoryRepository;
