import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import UserDashboard from "./pages/UserDashboard";

import Create from "./pages/Create";
import Success from "./pages/Success";

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
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<UserDashboard />} />
<<<<<<< HEAD
             <Route
        path="/create"
        element={<Create />}
      />
      {/*<Route 

        path="/success" 
        element={<Success />} 
      />
      <Route 
=======
            <Route path="/create" element={<Create />} />
            <Route path="/success" element={<Success />} />
            {/*  <Route 
>>>>>>> 295ac69092c64dbed188370feb64c3bc4f779b65
        path="/orderHistory" 
        element={<OrderHistory />} 
      /> */}
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;

