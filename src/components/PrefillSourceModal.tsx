import type { PrefillSource } from "../dataSources/types";

type PrefillSourceModalProps = {
  fieldName: string;
  sources: PrefillSource[];
  onSelect: (source: PrefillSource) => void;
  onClose: () => void;
};

export function PrefillSourceModal({
  fieldName,
  sources,
  onSelect,
  onClose,
}: PrefillSourceModalProps) {
  const groupedSources = sources.reduce<Record<string, PrefillSource[]>>(
    (groups, source) => {
      if (!groups[source.category]) {
        groups[source.category] = [];
      }

      groups[source.category].push(source);
      return groups;
    },
    {}
  );

  return (
    <div className="modalBackdrop">
      <div className="modal">
        <div className="modalHeader">
          <h3>Select prefill source for {fieldName}</h3>
          <button onClick={onClose}>Close</button>
        </div>

        {sources.length === 0 && <p>No available sources.</p>}

        {Object.entries(groupedSources).map(([category, categorySources]) => (
          <section key={category}>
            <h4>{category}</h4>

            {categorySources.map((source) => (
              <button
                key={source.id}
                className="sourceButton"
                onClick={() => onSelect(source)}
              >
                {source.label}
                <small>{source.valuePath}</small>
              </button>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}