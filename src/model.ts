export enum DataStatus {
  IDLE,
  LOADED,
  LOADING,
  UNHEALTHY,
  FAILED,
}

export interface BaseData {
  status: DataStatus;
}

export interface OverviewData {
  data?: Record<string, string>;
  status: DataStatus;
}

export type Resource = { [key: string]: string | string[] | undefined, name?: string, title?: string }

export interface ResourcesResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: Resource[];
}
export type ResourcesData = Record<string, ResourcesResult & {status: DataStatus.LOADED} | {status: DataStatus.LOADING}>;

