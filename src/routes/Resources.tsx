import {
  Link,
  useParams
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import capitalize from "@mui/material/utils/capitalize";
import ProgressStd from "../components/progress";
import { SwapiContext } from "../context/Swapi";
import { DataStatus, ResourcesResult } from "../model";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

const Resources = () => {
  let { category } = useParams();
  const { data: { resources }, fetchResource } = useContext(SwapiContext);
  const [currentResources, setCurrentResources] = useState<ResourcesResult | null>(null);
  useEffect(() => {
    if (!category) return; // TODO: add redirect to 404;
    if (!resources[category]) {
      fetchResource(category);
      return;
    }
    if (resources[category].status === DataStatus.LOADED) {
      setCurrentResources(resources[category] as ResourcesResult);
    }

  }, [category, resources.data, fetchResource, resources]);

  return (
    <Box>
      {category &&
        <Typography pl={2} variant="h6">{capitalize(`${category}:`)}</Typography>
      }
      {!currentResources &&
        <ProgressStd />
      }
      {currentResources &&
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {currentResources.results.map((item, index) => {
            const name = item.name || item.title || "unknown";
            return <Box key={name}><ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{name[0].toLocaleUpperCase()}</Avatar>
              </ListItemAvatar>
              <Link to={`/resources/${category}/${index}`}>
                <ListItemText
                  primary={name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Click for more info
                      </Typography>
                    </React.Fragment>
                  }
                /></Link>
            </ListItem>
              <Divider variant="inset" component="li" />
            </Box>
          })
          }
        </List>
      }
    </Box>
  );
}
export default Resources;


