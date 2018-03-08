import {
  getCollection,
  find,
} from '../core';

const getRescueTimeDailyCollection = getCollection('rescue_time_daily');

const CrateRescueTimeRepositoryRepository = async () => {
  const RescueTimeDailyCollection = await getRescueTimeDailyCollection;

  const getDailyLog = find(RescueTimeDailyCollection);

  return {
    getDailyLog,
    RescueTimeDailyCollection,
  };
};
export default CrateRescueTimeRepositoryRepository;
