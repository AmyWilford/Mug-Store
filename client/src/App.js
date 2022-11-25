import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


import { StoreProvider } from './utils/GlobalState';

import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from "./pages/UserDashboard";


import Create from './pages/Create';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// import UserDashboard from './pages/UserDashboard';
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <StoreProvider>
          <Router>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<UserDashboard />} />
              <Route path="/create" element={<Create />} />
              {/*<Route 

        path="/success" 
        element={<Success />} 
      />
            <Route path="/success" element={<Success />} />
            {/*  <Route 
        path="/orderHistory" 
        element={<OrderHistory />} 
      /> */}
            </Routes>
          </Router>
        </StoreProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
