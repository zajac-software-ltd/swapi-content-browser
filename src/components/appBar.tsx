import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {
  createSearchParams, useLocation, useNavigate,
  // useParams 
} from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import BreadcrumbsComp from './breadcrumbs';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchAppBar = () => {
  const navigate = useNavigate();
  // let { category } = useParams(); //TODO: check why it's udefined 
  const location = useLocation();

  const [searchPhrase, setSearchPhrase] = useState("");
  const [contentCatSelectPage, setContentCatSelectPage] = useState(false);
  const searchPath = location.pathname.replace(/\/[0-9]/, "");

  useEffect(() => {
    setSearchPhrase("");
    setContentCatSelectPage(location.pathname === "/resources");
  },
    [location.pathname]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            disabled={contentCatSelectPage}
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 1 }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <BreadcrumbsComp />
          <Search sx={{ mr: 2, width: { xs: "100%", md: "auto" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              disabled={contentCatSelectPage}
              placeholder={contentCatSelectPage ? "Select content before search" : "Search…"}
              inputProps={{ 'aria-label': 'search' }}
              value={searchPhrase}
              onChange={(e) => { setSearchPhrase(e.target.value) }}
            />
          </Search>

          <Button disabled={contentCatSelectPage || !searchPhrase.length} onClick={() => {
            navigate({
              pathname: location.pathname.indexOf("/search") === 0 ? location.pathname : `/search${searchPath}`,
              search: `?${createSearchParams({
                phrase: searchPhrase
              })}`
            })
          }} variant="contained" color="info" sx={{ px: 3 }}>search</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default SearchAppBar;
