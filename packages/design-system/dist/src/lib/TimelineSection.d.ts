import * as React from 'react';
export interface TimelineStep {
    step: string | number;
    title: string;
    description?: string;
}
export interface TimelineSectionProps {
    steps: TimelineStep[];
    kicker?: string;
    title?: React.ReactNode;
    intro?: string;
    variant?: 'horizontal' | 'vertical';
    light?: boolean;
    className?: string;
    'aria-label'?: string;
}
export declare function TimelineSection({ steps, kicker, title, intro, variant, light, className, 'aria-label': ariaLabel, }: TimelineSectionProps): React.JSX.Element;
