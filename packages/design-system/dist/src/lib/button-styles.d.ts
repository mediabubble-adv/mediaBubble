export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'hero-outline';
export type ButtonSize = 'sm' | 'md' | 'lg';
export declare const buttonVariantClasses: Record<ButtonVariant, string>;
export declare const buttonSizeClasses: Record<ButtonSize, string>;
export declare function getButtonClasses(variant?: ButtonVariant, size?: ButtonSize, className?: string): string;
