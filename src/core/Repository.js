import R from 'ramda';
import { MongoClient } from 'mongodb';
import config from '../config';

// const DB_CONNECTION_STRING = config.database.connectionString;

const getDb = async url => MongoClient.connect(url);

const getConnectedDb =
  R.curry((db, dbName) => db.db(dbName));


const getDbCollection =
  R.curry((db, collectionName) => db.collection(collectionName));

// const db = getDb(DB_CONNECTION_STRING);

export {
  getDb,
  getConnectedDb,
  getDbCollection,
};