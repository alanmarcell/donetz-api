import { createError } from 'apollo-errors';
import * as Repository from './Repository';

const create = async (collection, entity) => {
  const repositoryRes = await Repository.save(collection, entity);

  return repositoryRes;
};

const ResourceError = createError('ResourceError', {
  message: 'Invalid Resource',
});

export { create, ResourceError };

