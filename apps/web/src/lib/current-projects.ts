import { IProject } from '@/interfaces/IProject';

/** Shown when no Sanity projects are flagged as current. */
export const FALLBACK_CURRENT_PROJECTS: IProject[] = [
    {
        _id: 'fallback-amplifyup',
        title: 'AmplifyUP',
        slug: { _type: 'slug', current: 'amplifyup' },
        short_description:
            'An AI-powered content orchestration and marketing automation platform.',
        project_url: 'https://amplifyup.ai',
        technologies: ['Express JS', 'Next.js / TurboRepo', 'Clerk Auth'],
        isCurrent: true,
    },
    {
        _id: 'fallback-mycopilot',
        title: 'My Copilot',
        slug: { _type: 'slug', current: 'my-copilot' },
        short_description: 'An AI-powered LLM chat application.',
        project_url: 'https://copilot.dylanyoung.dev/',
        technologies: ['Next.js', 'Vercel AI SDK', 'TailwindCSS / ShadCN UI'],
        isCurrent: true,
    },
];
