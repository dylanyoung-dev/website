import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { markdownSchema } from "sanity-plugin-markdown";
import {
  articleCategory,
  articleGrid,
  author,
  awardsSection,
  contentSection,
  hero,
  page,
  pageMeta,
  post,
  project,
  series,
  snippet,
  snippetCategory,
  speaking,
  subscribeBanner,
  tagging,
  videoChannel,
  videoPost,
} from "./schemas/blog";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "DylanYoung.dev",
  projectId: "lanua4su",
  dataset: "production",
  plugins: [
    structureTool({ structure }),
    visionTool(),
    media(),
    markdownSchema(),
  ],
  schema: {
    types: [
      articleCategory,
      articleGrid,
      author,
      awardsSection,
      contentSection,
      hero,
      page,
      snippet,
      snippetCategory,
      post,
      series,
      tagging,
      videoPost,
      videoChannel,
      project,
      speaking,
      subscribeBanner,
      pageMeta,
    ],
  },
});
