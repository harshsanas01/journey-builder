import type { GraphNode } from "../types/graph";
import type { PrefillMapping } from "../types/prefill";

export function getInitialPrefillMappings(
  selectedNode: GraphNode
): Record<string, PrefillMapping> {
  const inputMapping = selectedNode.data.input_mapping ?? {};
  const result: Record<string, PrefillMapping> = {};

  for (const [fieldKey, mappingValue] of Object.entries(inputMapping)) {
    if (typeof mappingValue === "string") {
      result[fieldKey] = {
        sourceId: mappingValue,
        sourceLabel: mappingValue,
        sourceType: "existing",
        valuePath: mappingValue,
      };
    }
  }

  return result;
}