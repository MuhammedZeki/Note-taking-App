import { useState, useEffect } from 'react';

export const useFontTheme = () => {
    const [fontTheme, setFontTheme] = useState(() => {
        const saved = localStorage.getItem("fontTheme");
        if (saved === "serif") return 1;
        if (saved === "monospace") return 2;
        return 0;
    });

    const applyFontTheme = (fontType) => {
        const body = document.body;
        const html = document.documentElement;

        body.classList.remove("font-sans", "font-serif", "font-mono");
        html.classList.remove("font-sans", "font-serif", "font-mono");

        if (fontType === "sans-serif") {
            body.classList.add("font-sans");
            html.classList.add("font-sans");
            localStorage.setItem("fontTheme", "sans-serif");
        } else if (fontType === "serif") {
            body.classList.add("font-serif");
            html.classList.add("font-serif");
            localStorage.setItem("fontTheme", "serif");
        } else if (fontType === "monospace") {
            body.classList.add("font-mono");
            html.classList.add("font-mono");
            localStorage.setItem("fontTheme", "monospace");
        }
    };

    useEffect(() => {
        const savedFont = localStorage.getItem("fontTheme") || "sans-serif";
        applyFontTheme(savedFont);
    }, []);

    useEffect(() => {
        let fontType;
        if (fontTheme === 0) fontType = "sans-serif";
        else if (fontTheme === 1) fontType = "serif";
        else fontType = "monospace";

        applyFontTheme(fontType);
    }, [fontTheme]);

    const handleFontApply = () => {
        let fontType;
        if (fontTheme === 0) fontType = "sans-serif";
        else if (fontTheme === 1) fontType = "serif";
        else fontType = "monospace";

        applyFontTheme(fontType);
    };

    return {
        fontTheme,
        setFontTheme,
        handleFontApply
    };
};