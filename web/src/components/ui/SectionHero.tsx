import React, { FC } from 'react';
import _ from 'lodash';
import Link from 'next/link';
import { Button } from '../../interfaces/button';

interface SectionHeroProps {
    title: string;
    children: React.ReactNode;
    buttons?: Button[];
}

const SectionHero: FC<SectionHeroProps> = ({ title, children, buttons }) => {
    return (
        <section id="" className="block block-hero">
            <h1 className="block-title inner-sm">{title}</h1>
            <div className="block-content inner-sm">{children}</div>
            {!_.isEmpty(buttons) && (
                <div className="block-buttons inner-sm">
                    {buttons.map((button, index) => {
                        <Link key={index} href={button.url}>
                            <a>{button.label}</a>
                        </Link>;
                    })}
                </div>
            )}
        </section>
    );
};

export default SectionHero;
