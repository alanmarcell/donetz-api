import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import Path from 'path';

const opts = { recursive: true, extensions: ['.graphql'] };

const typesArray = fileLoader(Path.join(__dirname, '../'), opts);

export default mergeTypes(typesArray);
