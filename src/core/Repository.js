import R from 'ramda';
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

const save = R.curry(async (collection, entity) => {
  const result = await collection.replaceOne(
    { _id: entity.id },
    entity, { upsert: true },
  );

  return result.ops[0];
});

export {
  getConnection,
  getConnectedDb,
  getCollection,
  save,
};
