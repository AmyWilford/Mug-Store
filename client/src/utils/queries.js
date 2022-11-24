import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($productId: ID) {
    products(_id: $productId) {
      _id
      name
      description
      price
      quantity
      image
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
      imageIcon
      price
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
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
