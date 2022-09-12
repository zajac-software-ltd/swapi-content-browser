import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

const ProgressStd = () => {
  return <Box sx={{ display: 'flex', width: "100%", justifyContent: "center" }}>
    <CircularProgress />
  </Box>
}

export default ProgressStd;
