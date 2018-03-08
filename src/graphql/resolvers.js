import path from 'path';
import glob from 'glob';
import { mergeDeepLeft } from 'ramda';

const pattern = `dist/**/resolver.js`;

let otherResolvers = {};
glob.sync(pattern).forEach((file) => {
  const root = path.join(__dirname, '..', '..', file);
  const mod = require(root).default;
  otherResolvers = mergeDeepLeft(otherResolvers, mod);
});

export default otherResolvers;
