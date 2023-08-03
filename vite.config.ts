import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import * as path from "path"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

export default defineConfig({
  plugins: [react(), createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "public/images/icons")],
    symbolId: "icon-[dir]-[name]",

    inject: "body-last",
    customDomId: "__svg__icons__dom__",
  }),],
  resolve: {
    alias: [
      {find: "@", replacement: path.resolve(__dirname, "src")},
    ],
  },
})
