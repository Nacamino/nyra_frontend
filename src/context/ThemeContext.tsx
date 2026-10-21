import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

export type Theme = "dark" | "light" | "system";
export type AccentColor = "lavender" | "pink" | "green" | "blue";

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    accent: AccentColor;
    setAccent: (accent: AccentColor) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("nyra-theme");

        if (
            savedTheme === "dark" ||
            savedTheme === "light" ||
            savedTheme === "system"
        ) {
            return savedTheme;
        }

        return "dark";
    });

    const [accent, setAccent] = useState<AccentColor>(() => {
        const savedAccent = localStorage.getItem("nyra-accent");

        if (
            savedAccent === "lavender" ||
            savedAccent === "pink" ||
            savedAccent === "green" ||
            savedAccent === "blue"
        ) {
            return savedAccent;
        }

        return "lavender";
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
        const resolvedTheme =
            theme === "system"
            ? mediaQuery.matches ? "dark" : "light"
            : theme;

        document.documentElement.dataset.theme = resolvedTheme;
        document.documentElement.style.colorScheme = resolvedTheme;
        };

        applyTheme();

        mediaQuery.addEventListener("change", applyTheme);

        return () => {
        mediaQuery.removeEventListener("change", applyTheme);
        };
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("nyra-theme", theme);
    }, [theme]);
    
    useEffect(() => {
        localStorage.setItem("nyra-accent", accent);
        document.documentElement.dataset.accent = accent;
    }, [accent]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    return context;
}
