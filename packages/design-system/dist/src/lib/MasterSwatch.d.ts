import React from 'react';
export declare function MasterSwatch({ selectedColor, onCopy, copiedId, onColorSelect }: {
    selectedColor: string;
    onCopy: (text: string, id: string) => void;
    copiedId: string | null;
    onColorSelect: (hex: string) => void;
}): React.JSX.Element;
