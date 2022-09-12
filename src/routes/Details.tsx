
import { useContext, useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";
import { DataStatus, Resource, ResourcesResult } from "../model";
import Box from "@mui/material/Box";
import ProgressStd from "../components/progress";
import Typography from "@mui/material/Typography";
import capitalize from "@mui/material/utils/capitalize";
import { SwapiContext } from "../context/Swapi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Link } from "@mui/material";

const Details = () => {
  let { category, index } = useParams();

  const { data: { resources }, fetchResource } = useContext(SwapiContext);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
  useEffect(() => {
    if (!category || !index) return; // TODO: add redirect to 404;
    if (!resources[category] || resources[category].status !== DataStatus.LOADED) {
      fetchResource(category);
      return;
    }
    if (resources[category].status === DataStatus.LOADED) {
      const result = resources[category] as ResourcesResult;
      setCurrentResource({ ...result.results[+index] });
    }

  }, [category, resources.data, fetchResource, resources, index]);

  const renderDetails = () => {
    if (!currentResource) return null;

    return Object.entries(currentResource).map(([key, value], index) => {
      if (!Array.isArray(value)) {
        if (value && ["created", "edited"].includes(key)) {
          var date = new Date(value);
          value = date.toISOString().substring(0, 10);
        }
        if (key === "url") return null;
        return (
          <Typography key={`${key}${index}`} variant="h6" component="div">
            <Typography key={`${key}`} variant="h6" color="text.secondary" component="span">
              {capitalize(`${key.replace(/_/g, " ")}: `)}
            </Typography> {value}
          </Typography>
        )
      }
      return null; // TODO: render content in arrays;
    });
  }
  return (
    <Box sx={{ display: 'flex', width: "100%", justifyContent: "center" }}>
      {!currentResource &&
        <ProgressStd />
      }
      {currentResource &&
        <Card sx={{ minWidth: 300, p: 2 }}>
          <CardContent >
            <Typography key={"header"} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Details
            </Typography>
            {renderDetails()}
          </CardContent>
          {currentResource["url"] &&
            <CardActions >
              <Link sx={{ pl: "10px" }} href={currentResource["url"] as string} target={"_blank"}>Source</Link>
            </CardActions>
          }
        </Card>
      }
    </Box>
  );
}
export default Details;


