import type { FormField } from "../utils/fields";
import type { PrefillMapping } from "../types/prefill";

type PrefillFieldRowProps = {
  field: FormField;
  mapping?: PrefillMapping;
  onChoose: () => void;
  onClear: () => void;
};

export function PrefillFieldRow({
  field,
  mapping,
  onChoose,
  onClear,
}: PrefillFieldRowProps) {
  return (
    <div className="fieldRow">
      <button className="fieldMain" onClick={onChoose}>
        <strong>{field.label}</strong>
        <span>{mapping ? mapping.sourceLabel : "No prefill"}</span>
      </button>

      {mapping && (
        <button className="clearButton" onClick={onClear}>
          X
        </button>
      )}
    </div>
  );
}