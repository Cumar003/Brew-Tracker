
//react dom router for routing across the app
import { Routes, Route } from "react-router-dom";

//importing the guards for the routes in order to protect the routes.
import { AdminGuard, RootGuard } from "./components/guards/index";

//importing the pages for the app.
import Login from "./routes/(auth)/Login";
import { ShoppingList, Dashboard, StockManagement, Usermanagement } from "./routes/(root)";


const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />

      {/* Protected Root Routes */}
      <Route element={<RootGuard />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shopping-list" element={<ShoppingList />} />

        {/* Admin Routes (nested inside RootGuard) */}
        <Route element={<AdminGuard />}>
          <Route path="/admin/user-management" element={<Usermanagement />} />
          <Route path="/admin/stock-management" element={<StockManagement />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
