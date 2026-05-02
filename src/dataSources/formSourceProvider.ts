import type {
  PrefillDataSourceContext,
  PrefillDataSourceProvider,
  PrefillSource,
} from "./types";
import { getDirectDependencyIds, getTransitiveDependencyIds } from "../utils/dag";
import { getFormFields } from "../utils/fields";

function getFormByNodeId(context: PrefillDataSourceContext, nodeId: string) {
  const node = context.graph.nodes.find((item) => item.id === nodeId);

  if (!node) {
    return undefined;
  }

  return context.graph.forms.find(
    (form) => form.id === node.data.component_id
  );
}

function buildSourcesFromNodeIds(
  context: PrefillDataSourceContext,
  nodeIds: string[],
  category: string,
  sourceType: string
): PrefillSource[] {
  const sources: PrefillSource[] = [];

  for (const nodeId of nodeIds) {
    const form = getFormByNodeId(context, nodeId);

    if (!form) {
      continue;
    }

    const fields = getFormFields(form);

    for (const field of fields) {
      sources.push({
        id: `${sourceType}:${nodeId}:${field.key}`,
        label: `${form.name} > ${field.label}`,
        category,
        valuePath: `${nodeId}.${field.key}`,
        sourceType,
      });
    }
  }

  return sources;
}

export const DirectDependencySourceProvider: PrefillDataSourceProvider = {
  id: "direct-form-fields",
  label: "Direct dependency fields",
  getSources(context) {
    const directIds = getDirectDependencyIds(
      context.selectedNode.id,
      context.graph.edges
    );

    return buildSourcesFromNodeIds(
      context,
      directIds,
      "Direct Dependencies",
      "direct-form-field"
    );
  },
};

export const TransitiveDependencySourceProvider: PrefillDataSourceProvider = {
  id: "transitive-form-fields",
  label: "Transitive dependency fields",
  getSources(context) {
    const directIds = new Set(
      getDirectDependencyIds(context.selectedNode.id, context.graph.edges)
    );

    const allDependencyIds = getTransitiveDependencyIds(
      context.selectedNode.id,
      context.graph.edges
    );

    const transitiveOnlyIds = allDependencyIds.filter(
      (nodeId) => !directIds.has(nodeId)
    );

    return buildSourcesFromNodeIds(
      context,
      transitiveOnlyIds,
      "Transitive Dependencies",
      "transitive-form-field"
    );
  },
};