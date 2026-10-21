import type { ReactNode } from "react";

type SettingRowProps = {
    label: string;
    options: ReactNode;
};

export function SettingRow({ label, options }: SettingRowProps) {
    return (
        <div className="setting-row">
            <span className="setting-row__label">{label}</span>
            <div className="setting-row__options">{options}</div>
        </div>
    );
}
