import React from 'react';
import DOMPurify from 'dompurify';

const Description = ({ content, className }) => {
    // Sanitize HTML content
    const sanitizedContent = DOMPurify.sanitize(content);

    return (
        <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    );
};

export default Description;
