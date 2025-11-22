import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./modules/core/api/queryClient";

// pages
import { Home } from "./pages/Home";
import { Mochas } from "./pages/Mochas";
import { Food } from "./pages/Food";
import { LocationDetail } from "./pages/LocationDetail";
import { NotFound } from "./pages/NotFound";
import { VisitedLocations } from "./pages/VisitedLocations";

// components
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mochas" element={<Mochas />} />
        <Route path="/reposteria" element={<Food />} />
        <Route path="/visitados" element={<VisitedLocations />} />
        <Route path="/:domain/:id" element={<LocationDetail />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
