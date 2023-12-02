// {
//     "root": true,
//     "project": {
//         "name": "Personal Blog"
//     },
//     "api": {
//         "projectId": "lanua4su",
//         "dataset": "production"
//     },
//     "plugins": [
//         "@sanity/base",
//         "@sanity/default-layout",
//         "@sanity/default-login",
//         "@sanity/desk-tool",
//         "media",
//         "@sanity/code-input",
//         "markdown",
//         "@sanity/dashboard",
//         "note-field",
//         "dashboard-widget-netlify"
//     ],
//     "env": {
//         "development": {
//             "plugins": ["@sanity/vision"]
//         }
//     },
//     "parts": [
//         {
//             "name": "part:@sanity/base/schema",
//             "path": "./schemas/schema"
//         },
//         {
//             "implements": "part:@sanity/dashboard/config",
//             "path": "dashboardConfig.js"
//         }
//     ]
// }

// sanity.config.js
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { markdownSchema } from 'sanity-plugin-markdown';
import { netlifyTool } from 'sanity-plugin-netlify';
import { deskTool } from 'sanity/desk';
import { articleCategory, author, page, post, series, snippet, snippetCategory, tagging, videoChannel, videoPost } from './schemas/blog';

export default defineConfig({
    name: 'default',
    title: 'DylanYoung.dev',
    projectId: 'lanua4su',
    dataset: 'production',
    plugins: [deskTool(), markdownSchema(), unsplashImageAsset(), visionTool(), netlifyTool()],
    schema: {
        types: [articleCategory, author, page, snippet, snippetCategory, post, series, tagging, videoPost, videoChannel]
    }
});
