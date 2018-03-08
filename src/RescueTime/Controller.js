import R from 'ramda';
import request from 'request';
import CrateRescueTimeRepositoryRepository from './Repository';
import { get, getAll } from '../core';

const task = `6363318`
const Cookie = 'cit_s_id=d610a848fc6915706f38e24bfd0ff9d8';
const taskBaseUrl = `http://ewti.clockingit.com/tasks`
const headers = { Cookie }

var getLogCodeOptions = {
  url: `${taskBaseUrl}/add_work/${task}`,
  headers
};

const getCodeCallback = async (error, response, body) => {
  if (!error && response.statusCode == 200) {
    // console.log('response', response);

    return await body;
    // return request.post(saveLogOptions(code), saveLogCallback)
  }
  return console.log('Error getting code', error);
}

const fetchReport = async ({ date }) => {
  const res = await request({ url: `https://www.rescuetime.com/anapi/data?key=B63jNRbLeJL22BGuqqCXyLsbJk69mzY5aR4EsoNI&perspective=interval&rk=document&restrict_begin=${date}&restrict_end=${date}&format=json` },
    getCodeCallback);

    console.log('res', res);
  return res;
};

const CreateRescueTimeController = () => {
  const getRescueTimeDailyReport = async (query = {}, options) => {
    const {
      RescueTimeDailyCollection,
    } = await CrateRescueTimeRepositoryRepository();

    const dailyReport = await get(RescueTimeDailyCollection)({ query, options });

    console.log('== dailyReport ==', query)
    if (R.isEmpty(dailyReport)) {

      const report = await fetchReport(query)
      console.log('== report ==', report)
    }

    return dailyReport;
  };

  const getRescueTimeDailyReports = async (query = {}, options) => {
    const {
      RescueTimeDailyCollection,
    } = await CrateRescueTimeRepositoryRepository();

    return getAll(RescueTimeDailyCollection)({ query, options });
  };

  return { getRescueTimeDailyReport, getRescueTimeDailyReports };
};

export default CreateRescueTimeController;
