import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      orderStatus
      products {
        _id
        mugColor
        customizedColor
        customText
        imageIcon
        price
        count
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation Mutation(
    $mugColor: String
    $customizedColor: String
    $customText: String
    $imageIcon: String
    $count: Int
  ) {
    addProduct(
      mugColor: $mugColor
      customizedColor: $customizedColor
      customText: $customText
      imageIcon: $imageIcon
      count: $count
    ) {
      price
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $address: String!
    $city: String!
    $province: String!
    $country: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      province: $province
      country: $country
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;


export const EDIT_USER = gql`
  mutation editUser(
    $firstName: String!
    $lastName: String!
    $address: String!
    $city: String!
    $province: String!
    $country: String!
    $email: String!
    $password: String!
  ) {
    editUser(
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      province: $province
      country: $country
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
