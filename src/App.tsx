import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import { Home } from "./pages/Home";
import { Mochas } from "./pages/Mochas";
import { Food } from "./pages/Food";
import { LocationDetail } from "./pages/LocationDetail";
import { NotFound } from "./pages/NotFound";

// components
import Navbar from "./components/Navbar";
import { queryClient } from "./modules/core/api/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mochas" element={<Mochas />} />
        <Route path="/reposteria" element={<Food />} />
        <Route path="/:domain/:id" element={<LocationDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
