import { defineConfig } from "vite";

export default defineConfig({
    build:{
        emptyOutDir: false,
        sourcemap: false,
        minify: false,
        rollupOptions:{
            input:{
                content: "./content-scripts/content.ts",
            },
            output:{
                entryFileNames: "assets/[name].js",
                format: "iife", // Use IIFE format for browser compatibility
                inlineDynamicImports: true
            }
        }
    }
})