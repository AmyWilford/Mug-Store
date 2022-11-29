// Import gql from apollo client
import { gql } from '@apollo/client';

// Declare all queries
export const QUERY_PRODUCT = gql`
  query getProduct($productId: ID) {
    products(_id: $productId) {
      _id
      mugColor
      customizedColor
      customText
      customFont
      price
      count
    }
  }
`;

export const QUERY_ORDER = gql`
  query getOrder($orderId: ID) {
    order(_id: $orderId) {
      _id
      orderStatus
      products {
        _id
        mugColor
        customizedColor
        customText
        customFont
        count
        price
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      mugColor
      customizedColor
      customText
      customFont
      price
      count
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      address
      city
      province
      country
      email
      orders {
        _id
        purchaseDate
        orderStatus
        products {
          _id
          mugColor
          customizedColor
          customText
          customFont
          price
          count
        }
      }
    }
  }
`;
