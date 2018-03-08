import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import Path from 'path';

const opts = { recursive: true, extensions: ['.graphql'] };

const baseArray = fileLoader(Path.join(__dirname, './'), opts);
const typesArray = fileLoader(Path.join(__dirname, '../'), opts);

export default mergeTypes(typesArray, baseArray);
