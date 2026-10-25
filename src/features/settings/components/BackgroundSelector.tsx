
import {
    useTheme,
    type BackgroundMode,
} from "../../../context/ThemeContext";

const backgrounds: { value: BackgroundMode; label: string }[] = [
    { value: "solid", label: "Sólido" },
    { value: "gradient", label: "Degradado suave" },
];

export function BackgroundSelector() {
    const { backgroundMode, setBackgroundMode } = useTheme();

    return (
        <div
            className="background-selector"
            role="group"
            aria-label="Tipo de fondo"
        >
            {backgrounds.map((option) => (
            <button
                key={option.value}
                type="button"
                className={
                backgroundMode === option.value
                    ? "background-selector__button background-selector__button--active"
                    : "background-selector__button"
                }
                aria-pressed={backgroundMode === option.value}
                onClick={() => setBackgroundMode(option.value)}
            >
                {option.label}
            </button>
            ))}
        </div>
    );
}
