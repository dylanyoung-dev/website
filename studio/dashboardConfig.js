export default {
    widgets: [
        {
            name: 'netlify',
            options: {
                title: 'My Netlify deploys',
                sites: [
                    {
                        title: 'Sanity Studio',
                        apiId: 'a8d0e1fb-ee83-41aa-bf9a-afabb41643f8',
                        buildHookId: 'https://api.netlify.com/build_hooks/61e2ed098eef0b6e0d256bec',
                        name: 'dylanyoung-studio'
                    },
                    {
                        title: 'Website',
                        apiId: 'cbe11e3a-f46c-49a8-9bbd-f6da6e369a63',
                        buildHookId: 'https://api.netlify.com/build_hooks/61e2eca3f219515d9ff2cab7',
                        name: 'dylanyoung-web'
                    }
                ]
            }
        }
    ]
};
