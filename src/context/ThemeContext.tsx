import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

//Declaraciones de tipo para el tema, color de acento y modo de fondo
export type Theme = "dark" | "light" | "system";
export type AccentColor = "lavender" | "pink" | "green" | "blue";
export type BackgroundMode = "solid" | "gradient";

//Definicion de un tipo de objeto para el contexto del tema, que incluye el tema actual, color de acento y modo de fondo, junto con sus funciones de actualización
type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    accent: AccentColor;
    setAccent: (accent: AccentColor) => void;
    backgroundMode: BackgroundMode;
    setBackgroundMode: (backgroundMode: BackgroundMode) => void;
};

//crea el contecto de react y define su tipo
const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
    //Estado para el tema, color de acento y modo de fondo, inicializado con valores guardados en localStorage o valores predeterminados
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

    
    const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>(() => {
        const savedBackground = localStorage.getItem("nyra-background");

        if (savedBackground === "solid" || savedBackground === "gradient") {
            return savedBackground;
        }

        return "solid";
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

    useEffect(() => {
        localStorage.setItem("nyra-background", backgroundMode);
        document.documentElement.dataset.background = backgroundMode;
    }, [backgroundMode]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent, backgroundMode, setBackgroundMode }}>
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
