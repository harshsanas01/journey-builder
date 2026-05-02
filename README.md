# Journey Builder React Coding Challenge

This project is a React + TypeScript implementation of the Avantos Journey Builder coding challenge.

The app fetches a mock action blueprint graph, renders the available forms, and allows users to view, edit, and clear prefill mappings for each form field.

## Features

- Fetches action blueprint graph data from the provided mock server
- Renders a list of form nodes
- Allows selecting a form from the list
- Displays the selected form's fields
- Shows current prefill mapping state for each field
- Allows assigning a prefill source to a field
- Allows clearing an existing field mapping
- Supports direct dependency form fields
- Supports transitive dependency form fields
- Supports global data sources
- Uses an extensible data source provider design
- Includes basic tests for DAG traversal and data source behavior

## Tech Stack

- React
- TypeScript
- Vite
- Vitest
- CSS

## Project Structure

```text
journey-builder/
  src/
    api/
      graphApi.ts
    components/
      FormList.tsx
      PrefillFieldRow.tsx
      PrefillPanel.tsx
      PrefillSourceModal.tsx
    dataSources/
      formSourceProvider.ts
      globalSourceProvider.ts
      index.ts
      types.ts
    tests/
      dag.test.ts
      dataSources.test.ts
    types/
      graph.ts
      prefill.ts
    utils/
      dag.ts
      fields.ts
      prefillMapping.ts
    App.tsx
    main.tsx
    index.css
  README.md
  package.json
  vite.config.ts
Running the Mock Server
The mock server is provided separately in the frontendchallengeserver-main folder.
From the root folder that contains both projects:
cd frontendchallengeserver-main
npm install
npm start
The mock server should run on:
http://localhost:3000
Running the Frontend
Open a second terminal.
cd journey-builder
npm install
npm run dev
The frontend should run on:
http://localhost:5173
API Endpoint Used
The public challenge documentation describes the graph endpoint as:
/api/v1/{tenant_id}/actions/blueprints/{action_blueprint_id}/{blueprint_version_id}/graph
However, the provided mock server exposes the local route without blueprint_version_id:
/api/v1/{tenant_id}/actions/blueprints/{action_blueprint_id}/graph
This implementation follows the provided mock server route so the project runs locally.
The frontend currently calls:
http://localhost:3000/api/v1/123/actions/blueprints/bp_456/graph
The fetch logic is located in:
src/api/graphApi.ts
How the App Works
1.	App.tsx calls fetchActionBlueprintGraph(). 
2.	The graph response provides nodes, edges, and forms. 
3.	Form nodes are listed in the sidebar. 
4.	When a user selects a form, the app finds the matching form schema. 
5.	The app extracts fields from the form's field_schema.properties. 
6.	Each field is displayed in the prefill panel. 
7.	Clicking a field opens a modal with available prefill sources. 
8.	Selecting a source stores the mapping in local React state. 
9.	Clicking X clears the mapping for that field. 
Prefill Data Sources
The challenge asks for three kinds of prefill data:
1.	Form fields from forms that the selected form directly depends on 
2.	Form fields from forms that the selected form transitively depends on 
3.	Global data 
This project implements those with separate providers:
DirectDependencySourceProvider
TransitiveDependencySourceProvider
GlobalSourceProvider
These are registered in:
src/dataSources/index.ts
Extensible Data Source Design
Each data source provider follows this interface:
export type PrefillDataSourceProvider = {
  id: string;
  label: string;
  getSources: (context: PrefillDataSourceContext) => PrefillSource[];
};
Each provider returns a list of prefill source options:
export type PrefillSource = {
  id: string;
  label: string;
  category: string;
  valuePath: string;
  sourceType: string;
};
The modal does not need to know where a source came from. It only receives a flat list of sources and groups them by category.
This makes the UI reusable and keeps new source logic outside the React components.
Adding a New Data Source
To add a new data source, create a new provider in src/dataSources.
Example:
import type { PrefillDataSourceProvider } from "./types";

export const NewSourceProvider: PrefillDataSourceProvider = {
  id: "new-source",
  label: "New Source",
  getSources() {
    return [
      {
        id: "new-source:example",
        label: "Example Value",
        category: "New Source",
        valuePath: "new.example",
        sourceType: "new-source",
      },
    ];
  },
};
Then register it in src/dataSources/index.ts:
import { NewSourceProvider } from "./newSourceProvider";

export const prefillDataSourceProviders = [
  DirectDependencySourceProvider,
  TransitiveDependencySourceProvider,
  GlobalSourceProvider,
  NewSourceProvider,
];
No modal or field row code needs to change.
DAG Traversal
Dependency traversal logic lives in:
src/utils/dag.ts
It includes:
getDirectDependencyIds()
getTransitiveDependencyIds()
These functions use the graph edges array to determine which upstream forms are available as prefill sources.
Tests
Run tests with:
npm test
The project includes basic tests for:
•	Direct dependency traversal 
•	Transitive dependency traversal 
•	Global data source generation 
Test files are located in:
src/tests/
Build
To create a production build:
npm run build
To preview the production build:
npm run preview
Notes
•	Prefill mappings are stored in local React state. 
•	No backend persistence is required for this challenge. 
•	The app does not render the DAG as a node-based UI because the challenge explicitly says that is not required. 
•	Styling is intentionally lightweight but polished enough to clearly demonstrate the user flow. 
•	The code is organized so the live interview can build on top of the existing components and data source system.

