import R from 'ramda';
import shortid from 'shortid';
import { MongoClient } from 'mongodb';
import config from '../config';

const { dbName, host } = config.database;

const handleLimit = options => {
  return options.first ? R.merge(R.omit(['first'], options), { limit: options.first }) : options;
};

const handleRegex = (query = {}) => R.map(q => ({ $regex: q, $options: 'i' }), query);

const dbQueryBuilder = ({ query = {}, options = {} }) =>
  ({ query: handleRegex(query), options: handleLimit(options) });

const getConnection = async () => MongoClient.connect(host);

const getDb = connection => connection.db(dbName);

const getConnectedDb = () =>
  getConnection()
    .then(getDb);

const getCollection = collectionName =>
  getConnectedDb().then(db => db.collection(collectionName));

const handleEntityId = entity => R.merge(entity, {
  id: entity.id || shortid.generate(),
});

const save = R.curry(async (collection, entity) => {
  const entityWithId = handleEntityId(entity);

  const result = await collection.update(
    { _id: entityWithId.id },
    { $set: entityWithId }, { upsert: true },
  );

  return result.result.ok;
});

const bulkSave = R.curry(async (collection, entity) => {
  const entityWithId = entity.map(handleEntityId);

  const bulk = R.map(e => ({
    updateOne: {
      filter: { _id: e.id },
      update: { $set: e },
      upsert: true,
    },
  }), entityWithId);

  const result = await collection.bulkWrite(bulk);
  return result.ok;
});

const findOne = (collection) => (query, options) =>
  collection.findOne(query, options);

const find = (collection) => (query, options) => {
  console.log('query find', query)
  return collection.find(query, options);
}

const search = (collection) => (props) =>
  collection.find(...props);

export {
  dbQueryBuilder,
  bulkSave,
  getConnection,
  getConnectedDb,
  getCollection,
  save,
  find,
  findOne,
  search,
};
