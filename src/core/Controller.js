import * as Repository from './Repository';

const create = async (collection, entity) => {
  const repositoryRes = await Repository.save(collection, entity);

  return repositoryRes;
};


export { create };

