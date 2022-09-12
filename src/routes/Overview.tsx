
import React, { useContext, useEffect } from 'react';
import { Box, capitalize, List, ListItem, ListItemText, Typography } from '@mui/material';

import ProgressStd from '../components/progress';
import { SwapiContext } from '../context/Swapi';
import { Link } from 'react-router-dom';

const Overview = () => {

  const { data: { overview }, fetchOverview } = useContext(SwapiContext);
  useEffect(() => {
    if (!overview.data) fetchOverview();
  }, [fetchOverview, overview.data]);

  return (
    <Box>
      <Typography pl={2} variant="h6">Content categories: </Typography>
      {!overview.data &&
        <ProgressStd />
      }
      {overview.data &&
        <List>{
          Object.entries(overview.data).map(([key, value]) => {
            return <Link key={key} to={`/resources/${key}`}>
              <ListItem >
                <ListItemText
                  primary={capitalize(key)}
                  secondary={"Click to browse"}
                />
              </ListItem>
            </Link>
          })}
        </List>
      }
    </Box >
  );
}
export default Overview;
