/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_SUPADB_PASS: string;
    readonly VITE_SUPADB_URL: string;
    readonly VITE_SUPADB_API_KEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}