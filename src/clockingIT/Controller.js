import R from 'ramda';
import request from 'request-promise-native';
import moment from 'moment';
import CrateClockingItRepository from './Repository';
import { getAll, get } from '../core';

const task = '6363318';
const Cookie = 'cit_s_id=d610a848fc6915706f38e24bfd0ff9d8';
const taskBaseUrl = 'http://ewti.clockingit.com/tasks';
const headers = { Cookie };

const getTaskCode = taskType => {
  switch (taskType) {
    case 'NEW_FEATURES':
      return '6363318';

    case 'MEETING':
      return '6385473';


    default:
      break;
  }
};

const getAddWorkOptions = taskType => ({
  uri: `${taskBaseUrl}/add_work/${getTaskCode(taskType)}`,
  headers,
});

const findCodeOnBody = body => {
  const codeInit = body.search('destroy_log/');
  const code = body.slice(codeInit + 12, codeInit + 20);
  return code;
};

const addClockingWork = async (taskType) => {
  const res = await request(getAddWorkOptions(taskType));

  const code = findCodeOnBody(res);

  return code;
};

const submitLog = async (logOptions) => {
  try {
    const res = await request(logOptions);

    return true;
  } catch (e) {
    return false;
  }
};

const createLogForm = log => ({
  duration: log.duration,
  started_at: moment(log.startedAt).format('DD/MM/YYYY H:mm'),
  body: log.body,
});

const getSaveLogOptions = ({ code, log }) => ({
  uri: `${taskBaseUrl}/save_log/${code}`,
  headers,
  form: {
    commit: 'Save',
    log,
    task: {
      status: 1,
    },
  },
  resolveWithFullResponse: true,
});

const saveLogCallback = (error, response, body) => {
  console.log('Done hacking!!!');
  if (!error && response.statusCode == 302) {
    return console.log('Entry log saved!!!');
  }
  return console.log('Error saving log', error);
};

const getCodeCallback = (error, response, body) => {
  console.log('response', response);
  if (!error && response.statusCode == 200) {
    const codeInit = body.search('destroy_log/');

    const code = body.slice(codeInit + 12, codeInit + 20);
    console.log('saveLogCallback', getSaveLogOptions({ code }));
    return console.log('code', code);
    // return request.post(saveLogOptions(code), saveLogCallback)
  }
  return console.log('Error getting code', error);
};

// request(getLogCodeOptions, getCodeCallback);

const CreateClockingItController = () => {
  const createLog = async log => {
    const {
      saveLog,
    } = await CrateClockingItRepository();

    const saveSuccess = await saveLog({ saveSuccess: true, ...log });


    if (saveSuccess) {

      // IF SAVE SUCCESS SUBMIT REPORT TO CLOCKING IT

      console.log('SAVEDB SUCCESS', saveSuccess);
      // request(getLogCodeOptions, console.log);

    }

    return { saveSuccess };
  };

  const syncLog = async log => {
    const logToSave = createLogForm(log);
    const addWorkOptions = await addClockingWork(log.activity);
    const saveLogOptions = getSaveLogOptions({ log: logToSave, code: addWorkOptions });

    const logRes = submitLog(saveLogOptions);
    // TODO SAVE LAST SYNC
    return { saveSuccess: logRes };
  };

  const getLogs = async (query = {}, options) => {
    const {
      LogCollection,
    } = await CrateClockingItRepository();
    return getAll(LogCollection)({ query, options });
  };

  const getWeekLog = async (query = {}, options) => {
    const {
      LogCollection,
    } = await CrateClockingItRepository();


    const getDates = (startDate) => {
      const dates = R.map(a =>
        R.clone(startDate).add(a, 'days').format('YYYY-MM-DD'), R.range(0, 6));
      return dates;
    };

    const { startedAt } = query;
    const weekOfYear = R.isNil(startedAt) ? moment() : moment(startedAt);
    const startOfWeek = R.clone(weekOfYear.startOf('week'));
    const datesIn = R.merge(query, {
      startedAt: getDates(startOfWeek),
    });

    const weekRangLog = await get(LogCollection)({ query: datesIn, options });

    const week = await weekRangLog.toArray();
    return week;
  };

  return { createLog, getLogs, getWeekLog, syncLog };
};

export default CreateClockingItController;
