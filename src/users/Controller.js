import { log } from 'ptz-log';
import R from 'ramda';
import shortid from 'shortid';
import * as UserRepository from './Repository';
import { create, ResourceError } from '../core';


const createUser = async (collection, entity) => {
  const otherUsers = await UserRepository.getOtherUsersWithSameUserNameOrEmail(collection, entity)

  if (!R.isEmpty(otherUsers)) {
    return new ResourceError({ message: 'This email are already used by other account' })
  }

  const user = R.merge({
    id: entity.id || shortid.generate,
  }, entity);

  const repositoryRes = await create(collection, user);

  return repositoryRes;
};

export { createUser };

