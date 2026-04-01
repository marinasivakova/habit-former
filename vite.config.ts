import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        checker({
            typescript: true,
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        dedupe: ["react", "react-dom"],
    },
    build: {
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
        sourcemap: false,
    },
    server: {
        port: 3500,
    },
});
