"use client";

import { useState, useCallback, ReactNode, JSX } from "react";

type UseModalReturn = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
};

export function useModal(): UseModalReturn {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    return { isOpen, open, close, toggle };
}
