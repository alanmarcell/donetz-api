
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

export default typeDefs;
export { typeDefs };
