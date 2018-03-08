import R from 'ramda';

import CrateClockingItRepository from './Repository';

const CreateClockingItController = () => {
  const createLog = async log => {
    const {
      saveLog,
    } = await CrateClockingItRepository();

    const logDb = await saveLog(log);

    return { syncSuccess: R.equals(logDb, log) };
  };


  return { createLog };
};

export default CreateClockingItController;
