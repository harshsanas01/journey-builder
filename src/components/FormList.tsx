import type { GraphNode } from "../types/graph";

type FormListProps = {
  formNodes: GraphNode[];
  selectedNodeId: string | null;
  onSelectForm: (node: GraphNode) => void;
};

export function FormList({
  formNodes,
  selectedNodeId,
  onSelectForm,
}: FormListProps) {
  return (
    <aside className="panel sidebar">
      <h2>Forms</h2>

      {formNodes.length === 0 && <p>No forms found.</p>}

      {formNodes.map((node) => (
        <button
          key={node.id}
          className={node.id === selectedNodeId ? "formButton active" : "formButton"}
          onClick={() => onSelectForm(node)}
        >
          {node.data.name || node.id}
        </button>
      ))}
    </aside>
  );
}