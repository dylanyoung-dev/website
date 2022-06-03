import React from 'react';
import _ from 'lodash';

// import CtaButtons from './CtaButtons';

const SectionContent = ({ sectionId, title = 'Welcome', buttons, imageUrl, imageAlt, children }) => {
    return (
        <section id={sectionId} className="block block-text">
            {title && <h2 className="block-title underline inner-sm">{title}</h2>}
            {imageUrl && (
                <div className="block-image">
                    <img src={image} alt={imageAlt} />
                </div>
            )}
            <div className="block-content inner-sm">{children}</div>
            {/* {!_.isEmpty(actions) && (
            <div className="block-buttons inner-sm">
                <CtaButtons actions={actions} />
            </div>
        )} */}
        </section>
    );
};

export default SectionContent;
