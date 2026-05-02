import type { GraphEdge } from "../types/graph";

export function getDirectDependencyIds(
  formNodeId: string,
  edges: GraphEdge[]
): string[] {
  return edges
    .filter((edge) => edge.target === formNodeId)
    .map((edge) => edge.source);
}

export function getTransitiveDependencyIds(
  formNodeId: string,
  edges: GraphEdge[]
): string[] {
  const visited = new Set<string>();
  const result: string[] = [];

  function visit(currentNodeId: string) {
    const directParents = getDirectDependencyIds(currentNodeId, edges);

    for (const parentId of directParents) {
      if (visited.has(parentId)) {
        continue;
      }

      visited.add(parentId);
      result.push(parentId);
      visit(parentId);
    }
  }

  visit(formNodeId);

  return result;
}