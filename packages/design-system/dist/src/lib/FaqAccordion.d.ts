import * as React from 'react';
export interface FaqAccordionItem {
    question: string;
    answer: string;
}
export interface FaqAccordionProps {
    items: FaqAccordionItem[];
    className?: string;
    'aria-label'?: string;
}
export declare function FaqAccordion({ items, className, 'aria-label': ariaLabel, }: FaqAccordionProps): React.JSX.Element;
