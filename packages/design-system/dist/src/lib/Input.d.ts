import * as React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}
export declare function Input({ label, error, hint, id, className, ...props }: InputProps): React.JSX.Element;
