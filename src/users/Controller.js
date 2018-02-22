import { log } from 'ptz-log';
import R from 'ramda';
import shortid from 'shortid';
import CrateUserRepository from './Repository';
import { ResourceError } from '../core';

const CreateUserController = () => {
  const createUser = async (entity) => {
    const {
      getOtherUsersWithSameUserNameOrEmail,
      saveUser,
    } = await CrateUserRepository();

    const user = R.merge({
      id: entity.id || shortid.generate(),
      userName: entity.userName || entity.email,
    }, entity);

    const otherUsers = await getOtherUsersWithSameUserNameOrEmail(user);

    if (!R.isEmpty(otherUsers)) {
      return new ResourceError({ message: 'This email are already used by other account' });
    }

    return saveUser(user);
  };

  return { createUser };
};

export default CreateUserController;

