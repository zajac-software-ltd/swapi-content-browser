import Box from "@mui/material/Box"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation, useNavigate } from "react-router-dom";
import { SwapiContext } from "../context/Swapi";
import { useContext } from "react";
import { Button } from "@mui/material";

const BreadcrumbsComp = () => {

  const navigate = useNavigate();
  const location = useLocation()
  const { getResourceName } = useContext(SwapiContext);

  const renderPath = () => {
    const fragments = location.pathname.split("/");
    fragments.shift();
    const output: JSX.Element[] = [];
    fragments.forEach((fragment, i, array) => {
      output.push(<Button disabled={fragment === "search"} variant="text" color="inherit" key={fragment} onClick={() => { navigate(array.slice(0, i + 1).join("/")) }}>
        {i < 2 ? fragment : getResourceName(array[i - 1], +fragment)}
      </Button>)
    })
    return output;
  }

  return <Box sx={{ p: 0, m: "auto", display: { xs: "none", md: "block" }, width: "100%" }}>
    <Breadcrumbs aria-label="breadcrumb" color="inherit">
      {renderPath()}
    </Breadcrumbs>
  </Box>
}

export default BreadcrumbsComp;
