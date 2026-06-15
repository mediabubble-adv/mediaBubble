import * as React from 'react';
export interface LogoMarqueeItem {
    src: string;
    alt: string;
    href?: string;
}
export interface LogoMarqueeProps {
    items: LogoMarqueeItem[];
    duration?: number;
    reverse?: boolean;
    className?: string;
    'aria-label'?: string;
}
export declare function LogoMarquee({ items, duration, reverse, className, 'aria-label': ariaLabel, }: LogoMarqueeProps): React.JSX.Element;
