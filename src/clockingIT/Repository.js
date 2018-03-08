import {
  getCollection,
  save,
  find,
} from '../core';

const getLogCollection = getCollection('clocking_it');

const CrateClockingItRepository = async () => {
  const LogCollection = await getLogCollection;

  const saveLog = save(LogCollection);
  const getAllLogs = find(LogCollection);

  return {
    saveLog,
    getAllLogs,
    LogCollection,
  };
};
export default CrateClockingItRepository;
