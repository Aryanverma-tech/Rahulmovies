import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("marvel"); // Default search query

  return (
    <MovieProvider>
      <BrowserRouter>
        <Navbar onSearch={setSearchQuery} /> {/* ✅ Pass search function */}
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
