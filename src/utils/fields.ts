import type { ActionForm } from "../types/graph";

export type FormField = {
  key: string;
  label: string;
  type: string;
};

export function getFormFields(form: ActionForm): FormField[] {
  const properties = form.field_schema?.properties ?? {};

  return Object.entries(properties).map(([fieldKey, fieldValue]) => {
    const fieldObject = fieldValue as { title?: string; type?: string };

    return {
      key: fieldKey,
      label: fieldObject.title || fieldKey,
      type: fieldObject.type || "unknown",
    };
  });
}