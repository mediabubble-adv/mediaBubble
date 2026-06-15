import * as React from 'react';
type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export interface BadgeProps {
    variant?: BadgeVariant;
    children: React.ReactNode;
    className?: string;
}
export declare function Badge({ variant, children, className }: BadgeProps): React.JSX.Element;
export {};
