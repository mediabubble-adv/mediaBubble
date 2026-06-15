import * as React from 'react';
import { type ButtonSize, type ButtonVariant } from './button-styles';
export type { ButtonSize, ButtonVariant } from './button-styles';
export { getButtonClasses, buttonSizeClasses, buttonVariantClasses } from './button-styles';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    children: React.ReactNode;
}
export declare function Button({ variant, size, loading, disabled, className, children, ...rest }: ButtonProps): React.JSX.Element;
