import R from 'ramda';
import shortid from 'shortid';
import { MongoClient } from 'mongodb';
import config from '../config';

const { dbName, host } = config.database;

const getConnection = async () => MongoClient.connect(host);

const getDb = connection => connection.db(dbName);

const getConnectedDb = () =>
  getConnection()
    .then(getDb);

const getCollection = collectionName =>
  getConnectedDb().then(db => db.collection(collectionName));

const handleEntityId = entity => R.merge(entity, {
  id: entity.id || shortid.generate()
})

const save = R.curry(async (collection, entity) => {
  const entityWithId = handleEntityId(entity)

  const result = await collection.replaceOne(
    { _id: entityWithId.id },
    entityWithId, { upsert: true },
  );

  return result.ops[0];
});

const find = (collection) => (query, options) =>
  collection.find(query, options).toArray();

const findAll = (collection) => (query, options) =>
  collection.find(query, options);

export {
  getConnection,
  getConnectedDb,
  getCollection,
  save,
  find,
  findAll,
};
