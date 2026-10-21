import {
    useTheme,
    type AccentColor,
} from "../../../context/ThemeContext";

const accentColors: { value: AccentColor; label: string }[] = [
    { value: "lavender", label: "Lavanda" },
    { value: "pink", label: "Rosa" },
    { value: "green", label: "Verde" },
    { value: "blue", label: "Azul" },
];

export function AccentColorSelector() {
    const { accent, setAccent } = useTheme();

    return (
        <div
        className="accent-selector"
        role="group"
        aria-label="Color de acento"
        >
        {accentColors.map((option) => (
            <button
            key={option.value}
            type="button"
            data-accent={option.value}
            className={
                accent === option.value
                ? "accent-selector__button accent-selector__button--active"
                : "accent-selector__button"
            }
            aria-pressed={accent === option.value}
            onClick={() => setAccent(option.value)}
            >
            <span className="accent-selector__swatch" />
            <span>{option.label}</span>
            </button>
        ))}
        </div>
    );
}
