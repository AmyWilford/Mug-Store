const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Product {
    _id: ID
    mugColor: String
    customizedColor: String
    customText: String
    customFont: String
    count: Int
    price: Float
  }

  type Order {
    _id: ID
    purchaseDate: String
    orderStatus: Boolean
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    address: String
    city: String
    province: String
    country: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    products: [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      address: String!
      city: String!
      province: String!
      country: String!
      email: String!
      password: String!
    ): Auth
    addOrder(products: [ID]!): Order
    addProduct(
      mugColor: String
      customizedColor: String
      customText: String
      customFont: String
      count: Int
    ): Product
    updateUser(
      firstName: String
      lastName: String
      address: String
      city: String
      province: String
      country: String
      email: String
      password: String
    ): Auth
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
