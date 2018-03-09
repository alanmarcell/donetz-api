import R from 'ramda';
import request from 'request-promise-native';
import CrateRescueTimeRepositoryRepository from './Repository';
import { get, getAll, getWithNode } from '../core';


const fetchRescueTimeOptions = date => ({
  uri: `https://www.rescuetime.com/anapi/data?key=B63jNRbLeJL22BGuqqCXyLsbJk69mzY5aR4EsoNI&perspective=interval&rk=document&restrict_begin=${date}&restrict_end=${date}&format=json`,
});

const fetchReport = async ({ date }) => {

  console.log('=== init fetch', fetchRescueTimeOptions(date))
  const res = await request(fetchRescueTimeOptions(date))
  return JSON.parse(res);
};


const getRescueTimeData = rescueTimeData => rescueTimeData.rows || [];
const getRowHeaders = rescueTimeData => rescueTimeData.row_headers || [];

const getTableHeaders = ({ rowHeaders, times }) => R.map((header, index) => ({
  id: header, numeric: R.is(Number, times[0][index]), disablePadding: false, label: header,
}), rowHeaders);


const getHeaderCols = tableHeaders => R.map(R.prop('id'), tableHeaders);

const handleHeadersName = value => {


  const headersMap = {
    'Time Spent (seconds)': 'timeSpent'
  }

  return headersMap[value] || value.toLowerCase()
}

const indexCol = time => (value, key) => {

  const val = handleHeadersName(value)
  return { [val]: time[key] };
};

const getTimesIndexed = ({ headerCols, times }) => R.map(time => R.reduce(
  (prev, next) => R.merge(prev, next),
  [],
  headerCols.map(indexCol(time), headerCols)), times);

const CreateRescueTimeController = () => {

  const getRescueTimeActivities = async (query = {}, options = {}) => {
    const {
      RescueTimeActivitiesCollection,
      saveActivity,
    } = await CrateRescueTimeRepositoryRepository();

    const dailyReport = await getWithNode(RescueTimeActivitiesCollection)({ query, options });

    if (R.isEmpty(dailyReport)) {

      const report = await fetchReport(query)
      console.log('== report ==', typeof report)

      const times = getRescueTimeData(report);
      // console.log('== times ==', times)
      const rowHeaders = getRowHeaders(report);


      const tableHeaders = getTableHeaders({ times, rowHeaders })

      const headerCols = getHeaderCols(tableHeaders)
      // console.log('== headerCols ==', headerCols)
      const timesIndexed = getTimesIndexed({ headerCols, times });

      // console.log('== timesIndexed ==', timesIndexed)

      const savedActivity = await saveActivity(timesIndexed)
      console.log('== savedActivity ==', savedActivity)

      const activities = await get(RescueTimeActivitiesCollection)({ query, options });

      console.log('== activities ==', activities)
      return timesIndexed;
    }

    return dailyReport;
  };

  const getRescueTimeDailyReport = async (query = {}, options) => {
    const {
      RescueTimeDailyCollection,
    } = await CrateRescueTimeRepositoryRepository();

    const dailyReport = await get(RescueTimeDailyCollection)({ query, options });

    if (R.isEmpty(dailyReport)) {

      const report = await fetchReport(query)
      console.log('== report ==', typeof report)

      const times = getRescueTimeData(report);
      // console.log('== times ==', times)
      const rowHeaders = getRowHeaders(report);


      const tableHeaders = getTableHeaders({ times, rowHeaders })

      const headerCols = getHeaderCols(tableHeaders)
      console.log('== headerCols ==', headerCols)
      const timesIndexed = getTimesIndexed({ headerCols, times });

      console.log('== timesIndexed ==', timesIndexed)
      return timesIndexed;
    }

    return dailyReport;
  };

  const getRescueTimeDailyReports = async (query = {}, options) => {
    const {
      RescueTimeDailyCollection,
    } = await CrateRescueTimeRepositoryRepository();

    return getAll(RescueTimeDailyCollection)({ query, options });
  };

  return { getRescueTimeDailyReport, getRescueTimeDailyReports, getRescueTimeActivities };
};

export default CreateRescueTimeController;
