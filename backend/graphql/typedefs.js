
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

type Token {
  token : String!
  user : User
}

type Query {
    quotes: [Quote]
    users: [User]
  }

  type Mutation {
    addQuote(name: String!, by: ID!): Quote
    registerUser(firstName: String!, lastName: String!, email: String! , password:String!): User
    loginUser(email:String! , password:String!):Token
  }
`

export default typeDefs