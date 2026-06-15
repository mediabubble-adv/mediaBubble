import * as React from 'react';
export interface TabbedShowcaseTab {
    id: string;
    label: string;
    content: React.ReactNode;
}
export interface TabbedShowcaseProps {
    tabs: TabbedShowcaseTab[];
    defaultTabId?: string;
    className?: string;
    'aria-label'?: string;
}
export declare function TabbedShowcase({ tabs, defaultTabId, className, 'aria-label': ariaLabel, }: TabbedShowcaseProps): React.JSX.Element | null;
