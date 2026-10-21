import { useTheme, type Theme } from "../../../context/ThemeContext";

const themes: { value: Theme; label: string }[] = [
    { value: "dark", label: "Oscuro" },
    { value: "light", label: "Claro" },
    { value: "system", label: "Sistema" },
];

export function ThemeSelector() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="theme-selector" role="group" aria-label="Tema">
        {themes.map((option) => (
            <button
            key={option.value}
            type="button"
            className={
                theme === option.value
                ? "theme-selector__button theme-selector__button--active"
                : "theme-selector__button"
            }
            aria-pressed={theme === option.value}
            onClick={() => setTheme(option.value)}
            >
            {option.label}
            </button>
        ))}
        </div>
    );
}
