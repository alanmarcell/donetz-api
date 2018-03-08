import R from 'ramda';
import request from 'request';
import CrateClockingItRepository from './Repository';
import { getAll } from '../core';


const task = '6363318';
const Cookie = 'cit_s_id=d610a848fc6915706f38e24bfd0ff9d8';
const taskBaseUrl = 'http://ewti.clockingit.com/tasks';
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

const saveLogOptions = code => ({
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

  const getLogs = async (query = {}, options) => {
    const {
      LogCollection,
    } = await CrateClockingItRepository();
    return getAll(LogCollection)({ query, options });
  };

  return { createLog, getLogs };
};

export default CreateClockingItController;
