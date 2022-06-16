import React, { FC } from 'react';
import _ from 'lodash';
import { Post } from '../../interfaces/posts';

interface GitHubCollectionProps {}

const GitHubCollection: FC<GitHubCollectionProps> = () => {
    return (
        <section id="projects" className="block block-posts">
            <h2 className="block-title underline inner-sm">Github Projects</h2>
            <div className="post-feed">
                <div className="post-feed-inside">
                    <div className="w-full md:w-1/2 lg:w-1/3 md:pr-6 pb-4">
                        <a
                            href="https://github.com/Dawntraoz/full-static-nuxt-storyblok"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="border h-full rounded p-4 flex flex-col"
                        >
                            <div className="flex items-center">
                                <svg viewBox="0 0 16 16" aria-hidden="true" className="w-5 h-5 fill-current mr-2">
                                    <path
                                        fill-rule="evenodd"
                                        d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                                    ></path>
                                </svg>{' '}
                                <h3 className="text-lg font-medium">full-static-nuxt-storyblok</h3>
                            </div>{' '}
                            <p className="mt-2 mb-4 text-sm">
                                A boilerplate project designed to demonstrate the benefits of using JAMStack and the easy configuration of a project with NuxtJS
                                and Storyblok &lt;3
                            </p>{' '}
                            <div className="mt-auto flex text-sm">
                                <div className="mr-4">
                                    <span className="inline-block w-3 h-3 rounded-full relative"></span> <span>JavaScript</span>
                                </div>{' '}
                                <div className="items-center mr-4 flex">
                                    <svg aria-label="stars" viewBox="0 0 16 16" role="img" className="w-4 h-4 fill-current mr-2">
                                        <path
                                            fill-rule="evenodd"
                                            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                                        ></path>
                                    </svg>{' '}
                                    <span>26</span>
                                </div>{' '}
                                <div className="items-center flex">
                                    <svg aria-label="fork" viewBox="0 0 16 16" role="img" className="w-4 h-4 fill-current mr-2">
                                        <path
                                            fill-rule="evenodd"
                                            d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        ></path>
                                    </svg>{' '}
                                    <span>6</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            {/* {!_.isEmpty(actions) && (
                <div className="block-buttons inner-sm">
                    <CtaButtons actions={actions} />
                </div>
            )} */}
        </section>
    );
};

export default GitHubCollection;
