import { createElement, FC } from 'react';

interface TypographyProps {
    children: React.ReactNode;
    tag: TagTypes;
    classes?: string;
}

export enum TagTypes {
    Paragraph = 'P',
    Title = 'H1',
    Subtitle = 'H2',
    H3 = 'H3',
    H4 = 'H4',
    H5 = 'H5',
    H6 = 'H6'
}

const Typography: FC<TypographyProps> = ({ tag = TagTypes.Title, children, classes }) => {
    var extendedClasses = `block-title inner-sm ${classes}`;

    return createElement(tag, { className: classes }, children);
};

export { Typography };
