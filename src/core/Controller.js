import { map, isEmpty, last, head } from 'ramda';
import * as Repository from './Repository';

const generateEdges = (data, skiped) =>
  map((item, index) => ({ cursor: skiped + index + 1, node: item }), data);

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

const getAll = async (collection) => {
  const repositoryRes = await Repository.findAll(collection);
  const nodes = await repositoryRes.toArray();
  const totalCount = await repositoryRes.count();
  return makeCursor({ nodes, totalCount });
};

const create = async (collection, entity) => {
  const repositoryRes = await Repository.save(collection, entity);

  return repositoryRes;
};


export { create, getAll };

