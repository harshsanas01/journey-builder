import type { PrefillDataSourceProvider } from "./types";

export const GlobalSourceProvider: PrefillDataSourceProvider = {
  id: "global-data",
  label: "Global data",
  getSources() {
    return [
      {
        id: "global:client.email",
        label: "Client Email",
        category: "Global Data",
        valuePath: "client.email",
        sourceType: "global",
      },
      {
        id: "global:client.name",
        label: "Client Name",
        category: "Global Data",
        valuePath: "client.name",
        sourceType: "global",
      },
      {
        id: "global:organization.id",
        label: "Organization ID",
        category: "Global Data",
        valuePath: "organization.id",
        sourceType: "global",
      },
    ];
  },
};