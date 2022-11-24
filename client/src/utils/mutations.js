import { gql } from '@apollo/client';

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
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $mugColor: String
    $customizedColor: String
    $customText: String
    $imageIcon: String
  ) {
    addProduct(
      mugColor: $mugColor
      customizedColor: $customizedColor
      customText: $customText
      imageIcon: $imageIcon
    )
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
