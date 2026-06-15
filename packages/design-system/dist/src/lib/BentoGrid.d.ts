import * as React from 'react';
export interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}
export declare function BentoGrid({ children, className }: BentoGridProps): React.JSX.Element;
export interface BentoItemProps {
    children: React.ReactNode;
    colSpan?: 1 | 2 | 3;
    rowSpan?: 1 | 2;
    className?: string;
}
export declare function BentoItem({ children, colSpan, rowSpan, className }: BentoItemProps): React.JSX.Element;
