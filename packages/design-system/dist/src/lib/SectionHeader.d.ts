import * as React from 'react';
interface SectionHeaderProps {
    kicker?: string;
    title: React.ReactNode;
    intro?: string;
    align?: 'left' | 'center';
    light?: boolean;
    className?: string;
    id?: string;
}
export declare function SectionHeader({ kicker, title, intro, align, light, className, id, }: SectionHeaderProps): React.JSX.Element;
export {};
