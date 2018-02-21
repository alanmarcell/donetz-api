"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\ntype Query {\n  todos: [Todo]\n}\ntype Todo { title: String!, author: String!, id:ID! }\n\ntype User {\n  id: ID\n  name: String!\n  email: String!,\n  userName: String\n}\n\ninput CreateUserInput {\n  id: ID\n  name: String!,\n  email: String!,\n  password: String!\n  userName: String\n}\n\ntype Mutation {\n  createUser(user: CreateUserInput): User\n}\n";