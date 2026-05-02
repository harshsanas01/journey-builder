import type { ActionBlueprintGraph } from "../types/graph";

const BASE_URL = "http://localhost:3000";

export async function fetchActionBlueprintGraph(): Promise<ActionBlueprintGraph> {
  const tenantId = "123";
  const actionBlueprintId = "bp_456";

  const response = await fetch(
    `${BASE_URL}/api/v1/${tenantId}/actions/blueprints/${actionBlueprintId}/graph`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch blueprint graph");
  }

  return response.json();
}