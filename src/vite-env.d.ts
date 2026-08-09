/// <reference types="vite/client" />

/** Build-time overrides for src/config/flags.ts (merged into Vite's env type). */
interface ImportMetaEnv {
  readonly VITE_SHOW_VARIANT_B?: string;
  readonly VITE_SHOW_WILD_A?: string;
  readonly VITE_ANIMATIONS_A?: string;
}
