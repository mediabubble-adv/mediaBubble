import * as React from 'react';
export interface ComparisonTableRow {
    label: string;
    values: Array<string | boolean>;
}
export interface ComparisonTableProps {
    columns: string[];
    rows: ComparisonTableRow[];
    highlightColumn?: number;
    className?: string;
    'aria-label'?: string;
}
export declare function ComparisonTable({ columns, rows, highlightColumn, className, 'aria-label': ariaLabel, }: ComparisonTableProps): React.JSX.Element;
