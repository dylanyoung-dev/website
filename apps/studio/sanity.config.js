// sanity.config.js
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { markdownSchema } from 'sanity-plugin-markdown';
import { media } from 'sanity-plugin-media';
import { netlifyTool } from 'sanity-plugin-netlify';
import { deskTool } from 'sanity/desk';
import { articleCategory, author, page, post, project, series, snippet, snippetCategory, speaking, tagging, videoChannel, videoPost } from './schemas/blog';

export default defineConfig({
    name: 'default',
    title: 'DylanYoung.dev',
    projectId: 'lanua4su',
    dataset: 'production',
    plugins: [deskTool(), markdownSchema(), unsplashImageAsset(), visionTool(), netlifyTool(), media()],
    schema: {
        types: [articleCategory, author, page, snippet, snippetCategory, post, series, tagging, videoPost, videoChannel, project, speaking]
    }
});
