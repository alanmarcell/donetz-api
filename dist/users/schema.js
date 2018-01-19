"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const typeDefs = `
type Query {
  todos: [Todo]
}
type Todo { title: String!, author: String!, id:ID! }

type User {
  id: ID
  userName: String!
  email: String!,
  displayName: String
}

input CreateUserInput {
  id: ID
  userName: String!
  email: String!,
  displayName: String,
  password: String!
}

type Mutation {
  createUser(input: CreateUserInput): User
}
`;

exports.default = typeDefs;
exports.typeDefs = typeDefs;