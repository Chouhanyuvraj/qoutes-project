
const typeDefs =  `#graphql
type User {
    id:ID
    firstName:String!
    lastName:String!
    email:String!
    quotes:[Quote]
}
type Quote {
    name:String!
    by:ID!
}

type Query {
    quotes: [Quote]
    users: [User]
  }

  type Mutation {
    addQuote(quote: String!, author: String!): Quote
    addUser(firstName: String!, lastName: String!, email: String!): User
  }
`

export default typeDefs