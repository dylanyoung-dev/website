export type MvpContributionType = 'blog' | 'video' | 'presentation';

export interface MvpContribution {
    id: string;
    type: MvpContributionType;
    title: string;
    description?: string;
    url: string;
    /** ISO date string — used for sorting (newest first). */
    date: string;
    /** Opens in a new tab when true. Internal paths default to same-tab navigation. */
    external?: boolean;
}

/** Manually curated MVP program contributions — add, edit, or remove entries here. */
export const MVP_CONTRIBUTIONS: MvpContribution[] = [
    {
        id: 'sugcon-europe-2024',
        type: 'presentation',
        title: 'SUGCON Europe 2024',
        description: 'Conference session with curated slides, resources, and related posts.',
        url: '/speaking/sugcon-europe-2024/',
        date: '2024-10-01',
    },
    {
        id: 'personalize-sdk-deep-dive',
        type: 'presentation',
        title: 'Unleashing Personalization: Deep Dive into Sitecore Personalize SDK',
        description: 'Speaking engagement covering the Sitecore Personalize SDK.',
        url: '/speaking/unleashing-personalization-deep-dive-into-sitecore-personalize-sdk/',
        date: '2023-11-01',
    },
    {
        id: 'symposium-engagement-cloud',
        type: 'presentation',
        title: 'Sitecore Symposium 2022 — Developing with Engagement Cloud',
        description: 'Symposium session on building with Sitecore Engagement Cloud.',
        url: '/speaking/sitecore-symposium-2022-developing-with-engagement-cloud/',
        date: '2022-10-01',
    },
    {
        id: 'personalize-serializer-cli',
        type: 'blog',
        title: 'Sitecore CDP/Personalize Serializer CLI Tool — Introduction',
        description: 'Walkthrough of the serializer CLI for CDP and Personalize.',
        url: '/insights/sitecore-cdp-personalize-serializer-cli-tool-introduction/',
        date: '2023-03-01',
    },
    {
        id: 'xm-cloud-personalize-web',
        type: 'blog',
        title: 'Enabling Sitecore Personalize Web Experiences on XM Cloud',
        description: 'How to enable Personalize web experiences in XM Cloud.',
        url: '/insights/enabling-sitecore-personalize-web-experiences-on-xm-cloud/',
        date: '2023-01-15',
    },
    {
        id: 'js-modules-personalize',
        type: 'video',
        title: 'Introduction to JS Modules in Sitecore Personalize',
        description: 'Video on JavaScript modules within Sitecore Personalize.',
        url: '/videos/',
        date: '2023-02-06',
    },
    {
        id: 'xm-cloud-personalization-analytics',
        type: 'video',
        title: 'Sitecore XM Cloud — Getting Started with Personalization and Analytics',
        description: 'Getting started guide for personalization and analytics in XM Cloud.',
        url: '/videos/',
        date: '2022-12-06',
    },
];

export const MVP_CONTRIBUTION_TYPE_ORDER: MvpContributionType[] = [
    'presentation',
    'blog',
    'video',
];

export const MVP_CONTRIBUTION_TYPE_LABELS: Record<MvpContributionType, string> = {
    blog: 'Blog',
    video: 'Video',
    presentation: 'Presentation',
};

export function getContributionsByType(
    contributions: MvpContribution[] = MVP_CONTRIBUTIONS
): Record<MvpContributionType, MvpContribution[]> {
    const grouped: Record<MvpContributionType, MvpContribution[]> = {
        blog: [],
        video: [],
        presentation: [],
    };

    for (const contribution of contributions) {
        grouped[contribution.type].push(contribution);
    }

    for (const type of MVP_CONTRIBUTION_TYPE_ORDER) {
        grouped[type].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }

    return grouped;
}
