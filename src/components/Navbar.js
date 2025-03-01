import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1c1c1c", padding: "10px 0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          🎬 MoviesForEnergy
        </Typography>
        <Box display="flex" alignItems="center" sx={{ backgroundColor: "#333", borderRadius: 2, px: 2, py: 1 }}>
          <SearchIcon sx={{ color: "gray" }} />
          <InputBase
            placeholder="Search Movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ ml: 1, color: "white" }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;