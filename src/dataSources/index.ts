import type { PrefillDataSourceProvider } from "./types";
import {
  DirectDependencySourceProvider,
  TransitiveDependencySourceProvider,
} from "./formSourceProvider";
import { GlobalSourceProvider } from "./globalSourceProvider";

export const prefillDataSourceProviders: PrefillDataSourceProvider[] = [
  DirectDependencySourceProvider,
  TransitiveDependencySourceProvider,
  GlobalSourceProvider,
];