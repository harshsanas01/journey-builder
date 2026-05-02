export type GraphEdge = {
  source: string;
  target: string;
};

export type GraphNode = {
  id: string;
  type: string;
  data: {
    component_id?: string;
    component_key?: string;
    name?: string;
    input_mapping?: Record<string, unknown>;
    [key: string]: unknown;
  };
};

export type ActionForm = {
  id: string;
  name: string;
  description?: string;
  field_schema: {
    properties?: Record<string, unknown>;
    required?: string[];
    [key: string]: unknown;
  };
};

export type ActionBlueprintGraph = {
  id: string;
  tenant_id: string;
  name: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  forms: ActionForm[];
};