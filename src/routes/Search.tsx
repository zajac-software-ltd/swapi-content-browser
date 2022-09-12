import {
  useParams,
  useSearchParams
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import capitalize from "@mui/material/utils/capitalize";
import ProgressStd from "../components/progress";
import { SwapiContext } from "../context/Swapi";
import { Resource, ResourcesResult } from "../model";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Link from "@mui/material/Link";

const Search = () => {
  let { category } = useParams();
  const [searchParams,] = useSearchParams();

  const phrase = searchParams.get("phrase");

  const { searchResources } = useContext(SwapiContext);
  const [searchResult, setSearchResult] = useState<ResourcesResult | null>(null);

  useEffect(() => {
    const doSearch = async (c: string, p: string) => {
      const result = await searchResources(c, p);
      setSearchResult(result);
    }

    if (category && phrase) {
      setSearchResult(null);
      doSearch(category, phrase);
    }
  }, [category, phrase, searchResources]);

  const renderDetails = (res: Resource) => {
    return Object.entries(res).map(([key, value], index) => {
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
    <Box>
      {!searchResult &&
        <ProgressStd />
      }
      {searchResult &&
        <>
          <Typography sx={{ mb: 4 }} variant="h6">Found {searchResult.count} results </Typography>
          {searchResult.results.map((elem, index) => {
            return <Card key={`elem${index}`} sx={{ minWidth: 275, p: 4, mb: 4 }}>
              <CardContent >
                <Typography key={"header"} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Details
                </Typography>
                {renderDetails(elem)}
              </CardContent>
              {elem["url"] &&
                <CardActions >
                  <Link sx={{ pl: "10px" }} href={elem["url"] as string} target={"_blank"}>Source</Link>
                </CardActions>
              }
            </Card>
          })
          }
        </>
      }
    </Box >
  );
}
export default Search;


