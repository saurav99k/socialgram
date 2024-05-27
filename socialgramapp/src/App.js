// // App.js
import React from 'react';
import {
  Link,BrowserRouter as Router,Routes, Route, Navigate
} from "react-router-dom";

import Login from './Login';
import Dashboard from './Dashboard';
import Signup from './Signup';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Navigate to="/login" />
      )
    }
  />
);

const PublicRoute = ({ component: Component, isAuthenticated, restricted, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && restricted ? (
        <Navigate to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const App = () => {
  const isAuthenticated = false; // Replace with actual authentication logic

  return (
    <>
   <Router>
  
   <Routes>
        <PublicRoute
          restricted={false}
          isAuthenticated={isAuthenticated}
          component={Login}
          path="/login"
          exact
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          component={Dashboard}
          path="/dashboard"
          exact
        />
      </Routes>

  
  </Router>
  </>
  );
};

export default App;


//////////////////////////////////////////BELOW WORKING ! //////////////////////
// import {
//   Link,BrowserRouter,Routes, Route
// } from "react-router-dom";


// import Login from './Login';
// import Dashboard from './Dashboard';
// import Signup from './Signup';



// export default function App(){
//   const isAuthenticated = false; // Replace with actual authentication logic

//   return (
//     <>
//     <BrowserRouter>
//     <nav>
//      <Link to="/">Home Page</Link>
//         <Link to="/signup">Signup</Link>
//         <Link to="/login">Login</Link>
//     </nav>


//     <Routes>
//     <Route path="signup" element={<Signup />} />
//     <Route path="login" element={<Login />} />
//   </Routes>
  
//   </BrowserRouter>
    
    
//     </>
   
//   );
// };