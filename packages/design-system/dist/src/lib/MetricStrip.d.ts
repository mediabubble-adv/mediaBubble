import * as React from 'react';
export interface MetricStripItem {
    value: string;
    label: string;
}
export type MetricStripVariant = 'hero' | 'dark-bar' | 'light';
export interface MetricStripProps {
    items: MetricStripItem[];
    variant?: MetricStripVariant;
    columns?: 2 | 3 | 4;
    className?: string;
    'aria-label'?: string;
}
export declare function MetricStrip({ items, variant, columns, className, 'aria-label': ariaLabel, }: MetricStripProps): React.JSX.Element;
