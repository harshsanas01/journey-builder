import { useMemo, useState } from "react";
import type { ActionBlueprintGraph, GraphNode } from "../types/graph";
import type { PrefillMapping } from "../types/prefill";
import type { PrefillSource } from "../dataSources/types";
import { prefillDataSourceProviders } from "../dataSources";
import { getFormFields } from "../utils/fields";
import { getInitialPrefillMappings } from "../utils/prefillMapping";
import { PrefillFieldRow } from "./PrefillFieldRow";
import { PrefillSourceModal } from "./PrefillSourceModal";

type PrefillPanelProps = {
  graph: ActionBlueprintGraph;
  selectedNode: GraphNode | null;
};

export function PrefillPanel({ graph, selectedNode }: PrefillPanelProps) {
  const [activeFieldKey, setActiveFieldKey] = useState<string | null>(null);
  const [mappingsByNodeId, setMappingsByNodeId] = useState<
    Record<string, Record<string, PrefillMapping>>
  >({});

  const selectedForm = graph.forms.find(
    (form) => form.id === selectedNode?.data.component_id
  );

  const fields = selectedForm ? getFormFields(selectedForm) : [];

  const selectedNodeMappings =
    selectedNode === null
      ? {}
      : mappingsByNodeId[selectedNode.id] ??
        getInitialPrefillMappings(selectedNode);

  const availableSources = useMemo(() => {
    if (!selectedNode) {
      return [];
    }

    return prefillDataSourceProviders.flatMap((provider) =>
      provider.getSources({ graph, selectedNode })
    );
  }, [graph, selectedNode]);

  function updateFieldMapping(fieldKey: string, source: PrefillSource) {
    if (!selectedNode) {
      return;
    }

    setMappingsByNodeId((current) => ({
      ...current,
      [selectedNode.id]: {
        ...selectedNodeMappings,
        [fieldKey]: {
          sourceId: source.id,
          sourceLabel: source.label,
          sourceType: source.sourceType,
          valuePath: source.valuePath,
        },
      },
    }));

    setActiveFieldKey(null);
  }

  function clearFieldMapping(fieldKey: string) {
    if (!selectedNode) {
      return;
    }

    const nextMappings = { ...selectedNodeMappings };
    delete nextMappings[fieldKey];

    setMappingsByNodeId((current) => ({
      ...current,
      [selectedNode.id]: nextMappings,
    }));
  }

  if (!selectedNode || !selectedForm) {
    return (
      <main className="panel content">
        <h2>Select a form</h2>
        <p>Choose a form from the left to view prefill mappings.</p>
      </main>
    );
  }

  return (
    <main className="panel content">
      <h2>{selectedNode.data.name}</h2>
      <p className="muted">Form ID: {selectedForm.id}</p>

      <h3>Prefill Mapping</h3>

      {fields.length === 0 && <p>This form has no fields.</p>}

      {fields.map((field) => (
        <PrefillFieldRow
          key={field.key}
          field={field}
          mapping={selectedNodeMappings[field.key]}
          onChoose={() => setActiveFieldKey(field.key)}
          onClear={() => clearFieldMapping(field.key)}
        />
      ))}

      {activeFieldKey && (
        <PrefillSourceModal
          fieldName={activeFieldKey}
          sources={availableSources}
          onSelect={(source) => updateFieldMapping(activeFieldKey, source)}
          onClose={() => setActiveFieldKey(null)}
        />
      )}
    </main>
  );
}