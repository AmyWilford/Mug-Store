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
<<<<<<< HEAD
import UserDashboard from "./pages/UserDashboard";
function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserDashboard />} />
          {/* <Route
=======

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
// addint this as a test
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
            {/*   <Route
        path="/profile"
        element={<UserDashboard />}
        /> */}
            {/* <Route
>>>>>>> 6e95ce4874ac455816b59c81950cb9778a288d8b
        path="/create"
        element={<Create />}
      />
      <Route 
        path="/success" 
        element={<Success />} 
      />
      <Route 
        path="/orderHistory" 
        element={<OrderHistory />} 
      /> */}
<<<<<<< HEAD
        </Routes>
        <Home />
      </Router>
    </div>
=======
          </Routes>
          <p>TEST T E S T </p>
        </Router>
      </div>
    </ApolloProvider>
>>>>>>> 6e95ce4874ac455816b59c81950cb9778a288d8b
  );
}

export default App;
