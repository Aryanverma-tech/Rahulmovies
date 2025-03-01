import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import { Search as SearchIcon, Movie as MovieIcon } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: { width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  [theme.breakpoints.up("md")]: { width: "20ch", "&:focus": { width: "30ch" } },
}));

const Navbar = ({ onSearch }) => {
  const handleSearch = (e) => {
    if (onSearch) { // ✅ Ensure onSearch is a function before calling it
      onSearch(e.target.value);
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1c1c1c" }}>
      <Toolbar>
        <MovieIcon sx={{ mr: 1, color: "red" }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Rahul Movies
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search movies..."
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearch} // ✅ Use handleSearch function
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
