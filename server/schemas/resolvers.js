const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SK);

const resolvers = {
  Query: {
    products: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('orders');

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    product: async (parent, { _id }, context) => {
      return await Product.findById(_id);
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders',
          populate: {
            path: 'products',
          },
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('orders');
        console.log('Im user: ', user);
        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = await Order.create({ products: args.products });

      const orders = await Order.find();

      const user = await User.findByIdAndUpdate(context.user._id, {
        $push: { orders: order._id },
      });

      const line_items = [];

      const { products } = await order.populate('products');
      for (const element of products) {
        const product = await stripe.products.create({
          name: 'Custom Mug',
          description:
            'Color: ' + element.mugColor + ' Text: ' + element.customText,
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: element.price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: element.count,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    addProduct: async (parent, args, context) => {
      if (context.user) {
        return await Product.create(args);
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        args.isAdmin = null;
        let user = await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
        let token = signToken(user);
        let response = {
          user: user,
          token: token,
        };
        console.log(response);
        return response;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
