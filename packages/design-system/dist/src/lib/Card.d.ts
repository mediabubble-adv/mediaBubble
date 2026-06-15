import * as React from 'react';
export interface CardProps {
    children: React.ReactNode;
    hover?: boolean;
    padded?: boolean;
    className?: string;
}
export declare function Card({ children, hover, padded, className }: CardProps): React.JSX.Element;
interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    href?: string;
    className?: string;
}
export declare function ServiceCard({ icon, title, description, href, className }: ServiceCardProps): React.JSX.Element;
interface FeatureCardProps {
    feature: string;
    description?: string;
    className?: string;
}
export declare function FeatureCard({ feature, description, className }: FeatureCardProps): React.JSX.Element;
interface TestimonialCardProps {
    quote: string;
    author: string;
    title?: string;
    company?: string;
    avatarUrl?: string;
    className?: string;
}
export declare function TestimonialCard({ quote, author, title, company, avatarUrl, className, }: TestimonialCardProps): React.JSX.Element;
interface CaseStudyCardProps {
    metric: string;
    metricLabel: string;
    description: string;
    company: string;
    href?: string;
    className?: string;
}
export declare function CaseStudyCard({ metric, metricLabel, description, company, href, className, }: CaseStudyCardProps): React.JSX.Element;
export {};
