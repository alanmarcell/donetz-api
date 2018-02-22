import { encode } from 'jwt-simple';
import R from 'ramda';
import shortid from 'shortid';
import { compare, hash } from 'bcryptjs';
import CrateUserRepository from './Repository';
import { ResourceError, CredentialsError } from '../core';
import { server } from '../config';

import { log } from 'ptz-log';
const { jwt } = server;

const pHash = async password => hash(password, jwt);
const cEncode = user => encode(user, jwt);

const CreateUserController = () => {
  const createUser = async userArgs => {
    const {
      getOtherUsersWithSameUserNameOrEmail,
      saveUser,
    } = await CrateUserRepository();

    const password = await pHash(userArgs.password);

    const user = R.merge({
      id: userArgs.id || shortid.generate(),
      userName: userArgs.userName || userArgs.email,
      password,
    }, R.omit(['id', 'userName', 'password'], userArgs));


    const otherUsers = await getOtherUsersWithSameUserNameOrEmail(user);

    if (!R.isEmpty(otherUsers)) {
      return new ResourceError({ message: 'This email are already used by other account' });
    }

    return saveUser(user);
  };

  const login = async userArgs => {
    const {
      getByUserNameOrEmail,
    } = await CrateUserRepository();

    const { email, password } = userArgs;

    if (R.isEmpty(R.map(R.isNil, [email, password]))) {
      return new CredentialsError({ message: 'You must provide credentials' });
    }

    const userDb = await getByUserNameOrEmail(email);

    const isPasswordCorrect = await compare(password, userDb.password);

    if (!isPasswordCorrect) {
      return new CredentialsError({ message: 'Invalid credentials' });
    }

    return { token: cEncode(userDb) };
  };

  return { createUser, login };
};

export default CreateUserController;

