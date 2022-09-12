import { useState, createContext, useMemo, useRef } from "react";
import axios from "axios";
import { DataStatus, OverviewData, ResourcesData, ResourcesResult } from "../model";

export interface SwapiContextProps {
  data: {
    overview: OverviewData;
    resources: ResourcesData;
  };
  fetchOverview: () => Promise<void>;
  fetchResource: (id: string) => Promise<void>;
  getResourceName: (id: string, index: number) => string | null;
  searchResources: (resourcesId: string, value: string) => Promise<ResourcesResult | null>;
}
const defaults = {
  data: {
    overview: { status: DataStatus.IDLE },
    resources: {},
  },
  fetchOverview: async () => { },
  fetchResource: async (id: string) => { },
  getResourceName: ((id: string, index: number) => null),
  searchResources: async (id: string, value: string) => { return null },
}
export const SwapiContext = createContext<SwapiContextProps>(
  defaults
);

export const SwapiDataProvider = ({ children }: { children: React.ReactNode }) => {

  const [overview, setOverview] = useState<OverviewData>(defaults.data.overview);
  const [resources, setResources] = useState<ResourcesData>(defaults.data.resources);
  const loadingStatus = useRef<Record<string, DataStatus>>({});

  const fetchOverview = async () => {
    if (overview.data) return;
    if (loadingStatus.current["overview.data"] === DataStatus.LOADING) return;
    loadingStatus.current["overview.data"] = DataStatus.LOADING;
    try {
      const res = await axios.get<Record<string, string>>('https://swapi.dev/api/');
      setOverview({ status: DataStatus.LOADED, data: { ...res.data } })
    } catch (error: unknown) {
      console.error({ error });
    }
  }

  const fetchResource = async (id: string) => {
    if (resources[id]) return;
    if (loadingStatus.current[`resource${id}`] === DataStatus.LOADING) return;
    loadingStatus.current[`resource${id}`] = DataStatus.LOADING;

    try {
      const res = await axios.get<ResourcesResult>(`https://swapi.dev/api/${id}`);
      setResources({ ...resources, [id]: { ...res.data, status: DataStatus.LOADED } });
      delete loadingStatus.current[`resource${id}`];
    } catch (error: unknown) {
      console.error({ error });
    }
  }

  const getResourceName = (id: string, index: number) => {
    if (resources[id]?.status === DataStatus.LOADED) {
      const resource = (resources[id] as unknown as ResourcesResult).results[index];
      return resource.name || resource.title || null;
    }
    return null;
  }

  const searchResources = async (resourcesId?: string, searchPhrase?: string) => {
    try {
      const res = await axios.get<ResourcesResult>(`https://swapi.dev/api/${resourcesId}?search=${searchPhrase}`);
      return res.data;
    } catch (error: unknown) {
      console.error({ error });
      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };
    }
  }

  const value = useMemo(
    () => ({
      fetchOverview,
      fetchResource,
      getResourceName,
      searchResources,
      data: {
        overview,
        resources,
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [overview, resources]
  );

  return (
    <SwapiContext.Provider value={value}>
      {children}
    </SwapiContext.Provider>
  );
}
