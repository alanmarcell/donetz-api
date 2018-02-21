import R from 'ramda';

const getOtherUsersWithSameUserNameOrEmail = R.curry((collection, user) => {
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

  return collection
    .find(query, select)
    .toArray();
});

export {
  getOtherUsersWithSameUserNameOrEmail,
};
