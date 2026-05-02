import type { ActionBlueprintGraph, GraphNode } from "../types/graph";

export type PrefillSource = {
  id: string;
  label: string;
  category: string;
  valuePath: string;
  sourceType: string;
};

export type PrefillDataSourceContext = {
  graph: ActionBlueprintGraph;
  selectedNode: GraphNode;
};

export type PrefillDataSourceProvider = {
  id: string;
  label: string;
  getSources: (context: PrefillDataSourceContext) => PrefillSource[];
};