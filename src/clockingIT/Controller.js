import R from 'ramda';
import request from 'request';
import moment from 'moment';
import CrateClockingItRepository from './Repository';
import { getAll, get } from '../core';


const task = '6363318';
const Cookie = 'cit_s_id=d610a848fc6915706f38e24bfd0ff9d8';
const taskBaseUrl = 'aaahttp://ewti.clockingit.com/tasks';
const headers = { Cookie };

const getLogCodeOptions = {
  url: `${taskBaseUrl}/add_work/${task}`,
  headers,
};
const createLogForm = log => ({
  duration: log.duration,
  started_at: log.startedAt,
  body: log.body,
});

const saveLogOptions = ({ code, log }) => ({
  url: `${taskBaseUrl}/save_log/${code}`,
  headers,
  form: {
    commit: 'Save',
    log,
    task: {
      status: 1
    }
  }
});

const saveLogCallback = (error, response, body) => {
  console.log('Done hacking!!!')
  if (!error && response.statusCode == 302) {
    return console.log('Entry log saved!!!')
  }
  return console.log('Error saving log', error);
}

const getCodeCallback = (error, response, body) => {
  console.log('response', response);
  if (!error && response.statusCode == 200) {
    const codeInit = body.search('destroy_log/')

    const code = body.slice(codeInit + 12, codeInit + 20)
    console.log('saveLogCallback', saveLogOptions({ code }));
    return console.log('code', code);
    // return request.post(saveLogOptions(code), saveLogCallback)
  }
  return console.log('Error getting code', error);
}

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

    const logToSave = createLogForm(log)
    console.log('createLogForm', logToSave);

    return { saveSuccess: true };
  }

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


    const { startedAt } = query
    console.log(' ==== startedAt', startedAt);

    const weekOfYear = moment(startedAt).week()
    console.log(' ==== weekOfYear', weekOfYear);

    const weekLog = await get(LogCollection)({ query, options });

    const week = await weekLog.toArray();


    console.log(' ==== week', week);
    return week;
  };

  return { createLog, getLogs, getWeekLog, syncLog };
};

export default CreateClockingItController;
