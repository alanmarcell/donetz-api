import {
  getCollection,
  save,
} from '../core';

const getUserCollection = getCollection('users');

const CrateUserRepository = async () => {
  const UserCollection = await getUserCollection;

  const getOtherUsersWithSameUserNameOrEmail = user => {
    const query = {
      _id: { $ne: user.id },
      $or: [
        { email: user.email },
        { userName: user.userName },
      ],
    };

    const select = {
      userName: 1,
      email: 1,
    };

    return UserCollection.find(query, select)
      .toArray();
  };

  const saveUser = save(UserCollection);

  return {
    getOtherUsersWithSameUserNameOrEmail,
    saveUser,
  };
};
export default CrateUserRepository;
