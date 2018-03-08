import {
  getCollection,
  save,
} from '../core';

const getLogCollection = getCollection('clocking_it');

const CrateClockingItRepository = async () => {
  const LogCollection = await getLogCollection;

  const saveLog = save(LogCollection);

  return {
    saveLog,
  };
};
export default CrateClockingItRepository;
