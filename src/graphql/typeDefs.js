
import { mergeTypes } from 'merge-graphql-schemas';

import userType from '../users/schema';


const types = [
  userType,
]

export default mergeTypes(types);