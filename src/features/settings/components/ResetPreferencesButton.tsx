import { useTheme } from "../../../context/ThemeContext";

export function ResetPreferencesButton() {
    const { setTheme, setAccent, setBackgroundMode } = useTheme();

    const handleReset = () => {
        setTheme("dark");
        setAccent("lavender");
        setBackgroundMode("solid");
    };

    return (
        <button
        type="button"
        className="settings-reset-button"
        onClick={handleReset}
        >
        Restablecer apariencia
        </button>
    );
}
