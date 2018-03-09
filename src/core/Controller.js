import { curry, map, isEmpty, last, head, omit, merge } from 'ramda';
import * as Repository from './Repository';

const generateEdges = (data, skiped) =>
  map((item, index) => ({ cursor: skiped + index + 1, node: item }), data);

const edgeFactory = repositoryCursor =>
  ({ totalCount: repositoryCursor.count(), nodes: repositoryCursor.toArray() })

const makeCursor = ({
  totalCount = 0, nodes = [], skipped = 0, hasNextPage = false,
}) => {
  const edges = generateEdges(nodes, skipped);

  return {
    totalCount,
    pageInfo: {
      endCursor: !isEmpty(edges) ? last(edges).cursor : null,
      startCursor: !isEmpty(edges) ? head(edges).cursor : null,
      hasNextPage,
    },
    edges,
    nodes,
  };
};

const handleLimit = options => {
  return options.first ? merge(omit(['first'], options), { limit: options.first }) : options;
};

const search = collection => async (query = {}, options = {}) => {
  const repositoryRes = await Repository.find(collection)(Repository.dbQueryBuilder({ query, options }));
  const nodes = await repositoryRes;
  return nodes;
};


const getAll = (collection) => async ({ query, options = {} }) => {
  const newOptions = handleLimit(options);  
  const repositoryRes = await Repository.find(collection)(query, newOptions);

  const nodes = await repositoryRes.toArray();

  const totalCount = await repositoryRes.count();
  return makeCursor({ nodes, totalCount });
};

const getAllWithNode = collection => async props => makeCursor(await getAll(collection, ...props));

const get = collection => async (query = {}, options = {}) => {
  const repositoryRes = await Repository.find(collection)(Repository.dbQueryBuilder({ query, options }));
  const nodes = await repositoryRes;
  return nodes;
};

const getWithNode = collection => async props => makeCursor(await get(collection, ...props));

const create = async (collection, entity) => {
  const repositoryRes = await Repository.save(collection, entity);

  return repositoryRes;
};

export { create, getAll, getAllWithNode, get, getWithNode };
