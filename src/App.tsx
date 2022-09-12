
import './App.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Routes, Route, Navigate } from "react-router-dom";
import Overview from './routes/Overview';
import Resources from './routes/Resources';
import Details from './routes/Details';

import Search from './routes/Search';
import SearchAppBar from './components/appBar';

const App = () => {
  return (
    <Container >
      <SearchAppBar />
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ width: 1, textAlign: "center", mb: 4 }}>
          Start Wars API Browser
        </Typography>
        <Routes>
          <Route path="*" element={<Navigate to="/resources" replace />} />
          <Route path="/resources" element={<Overview />} />
          <Route path="/resources/:category/" element={<Resources />} />
          <Route path="/resources/:category/:index" element={<Details />} />
          <Route path="/search/resources/:category/*" element={<Search />} />
        </Routes>
      </Box>
    </Container>
  );
}
export default App;
