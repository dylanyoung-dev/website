const SectionTitle = ({ label, level, classes }) => {
    var HTag = `h${level}`;
    var extendedClasses = `block-title inner-sm ${classes}`;

    return <HTag className={extendedClasses}>{label}</HTag>;
};

export { SectionTitle };
