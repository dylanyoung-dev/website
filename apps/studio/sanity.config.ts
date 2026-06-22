import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { articleCategory, author, page, post, project, series, snippet, snippetCategory, speaking, tagging, videoChannel, videoPost } from './schemas/blog';

export default defineConfig({
    name: 'default',
    title: 'DylanYoung.dev',
    projectId: 'lanua4su',
    dataset: 'production',
    plugins: [structureTool(), visionTool(), media()],
    schema: {
        types: [articleCategory, author, page, snippet, snippetCategory, post, series, tagging, videoPost, videoChannel, project, speaking]
    }
});

