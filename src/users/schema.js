
export default `
type Query {
  todos: [Todo]
}
type Todo { title: String!, author: String!, id:ID! }

type User {
  id: ID
  name: String!
  email: String!,
  userName: String
}

input CreateUserInput {
  id: ID
  name: String!,
  email: String!,
  password: String!
  userName: String
}

type Mutation {
  createUser(user: CreateUserInput): User
}
`;

