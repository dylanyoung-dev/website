import { FC } from 'react';

interface SectionTimeLineProps {}

const SectionTimeline: FC<SectionTimeLineProps> = () => {
    return (
        <section id="timeline" className="timeline">
            <div className="item">
                <div className="timeline-content">
                    <div>
                        <section className="year">
                            <h3>2022</h3>
                            <section>
                                <h4>April</h4>
                                <ul>
                                    <li>Presented at Sitecore Virtual Developer Day 2022.</li>
                                </ul>
                            </section>
                            <section>
                                <h4>March</h4>
                                <ul>
                                    <li>
                                        Participated in Sitecore Hackathon 2022. Worked with Andrew Owen, Rob Earlam and myself for Sitecore Developer Relations
                                        (Team Sitecore DevRel).
                                    </li>
                                </ul>
                            </section>
                            <section>
                                <h4>January</h4>
                                <ul>
                                    <li>Awarded my fifth Sitecore Technology MVP award for 2022.</li>
                                </ul>
                            </section>
                        </section>
                        <section className="year">
                            <h3>2021</h3>
                            <section>
                                <h4>December</h4>
                                <ul>
                                    <li>Started new role in Developer Advocacy/Developer Relations at Sitecore.</li>
                                </ul>
                            </section>
                            <section>
                                <h4>November</h4>
                                <ul>
                                    <li>Left my role at RDA Corp.</li>
                                </ul>
                            </section>
                            <section>
                                <h4>October</h4>
                                <ul>
                                    <li>
                                        Presented with Jaina Baumgartner at Sitecore Symposium 2021 on Sitecore Horizon and SXA:{' '}
                                        <a href="https://www.youtube.com/watch?v=PKG09Jewj3s" target="_blank">
                                            Watch Here
                                        </a>
                                    </li>
                                </ul>
                            </section>
                            <section>
                                <h4>July</h4>
                                <ul>
                                    <li>Started my new role at Director of Digital Engineering at RDA Corp.</li>
                                </ul>
                            </section>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionTimeline;
