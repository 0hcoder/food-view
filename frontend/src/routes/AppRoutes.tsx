import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/user-register" element={<h1>UserRegister</h1>} />
        <Route path="/user-login" element={<h1>Login</h1>} />
        <Route
          path="/food-partner-register"
          element={<h1>Food Partner Register</h1>}
        />
        <Route
          path="/food-partner-login"
          element={<h1>Food Partner Login</h1>}
        />
        <Route path="*" element={<h1>NO Page</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
