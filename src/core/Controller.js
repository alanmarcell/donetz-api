import R from 'ramda';

const save = R.curry(async (collection, entity) => {
  const result = await collection.replaceOne(
    { _id: entity.id },
    entity, { upsert: true },
  );

  return result.ops[0];
});

export { save };
