import { useEffect, useMemo, useState } from "react";
import { fetchActionBlueprintGraph } from "./api/graphApi";
import type { ActionBlueprintGraph, GraphNode } from "./types/graph";
import { FormList } from "./components/FormList";
import { PrefillPanel } from "./components/PrefillPanel";

export default function App() {
  const [graph, setGraph] = useState<ActionBlueprintGraph | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadGraph() {
      try {
        const graphData = await fetchActionBlueprintGraph();
        setGraph(graphData);

        const firstFormNode = graphData.nodes.find(
          (node) => node.type === "form"
        );

        setSelectedNode(firstFormNode ?? null);
      } catch {
        setErrorMessage("Could not load graph. Make sure mock server is running.");
      } finally {
        setIsLoading(false);
      }
    }

    loadGraph();
  }, []);

  const formNodes = useMemo(() => {
    return graph?.nodes.filter((node) => node.type === "form") ?? [];
  }, [graph]);

  if (isLoading) {
    return <div className="page">Loading graph...</div>;
  }

  if (errorMessage || !graph) {
    return <div className="page error">{errorMessage}</div>;
  }

  return (
    <div className="page">
      <header>
        <h1>Journey Builder</h1>
        <p>{graph.name}</p>
      </header>

      <div className="layout">
        <FormList
          formNodes={formNodes}
          selectedNodeId={selectedNode?.id ?? null}
          onSelectForm={setSelectedNode}
        />

        <PrefillPanel graph={graph} selectedNode={selectedNode} />
      </div>
    </div>
  );
}