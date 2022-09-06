import React, { FC } from 'react';
import _ from 'lodash';
import { Button } from '../../interfaces/button';

interface SectionContentProps {
    SectionId: string;
    title: string;
    buttons: Button[];
    children: React.ReactNode;
    imageUrl: string;
    imageAlt: string;
}

const SectionContent: FC<SectionContentProps> = ({ SectionId, title = 'Welcome', buttons, imageUrl, imageAlt, children }) => {
    return (
        <section id={SectionId} className="block block-text">
            {title && <h2 className="block-title underline inner-sm">{title}</h2>}
            {imageUrl && (
                <div className="block-image">
                    <img src={imageUrl} alt={imageAlt} />
                </div>
            )}
            <div className="block-content inner-sm">{children}</div>
        </section>
    );
};

export default SectionContent;
