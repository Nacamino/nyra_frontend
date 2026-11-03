import { PageHeader } from "../../../components/layout/PageHeader";
import { SettingRow } from "../components/SettingRow";
import { ThemeSelector } from "../components/ThemeSelector";
import { AccentColorSelector } from "../components/AccentColorSelector";
import { BackgroundSelector } from "../components/BackgroundSelector";
import { ResetPreferencesButton } from "../components/ResetPreferencesButton";
import { ModelStatus } from "../components/ModelStatus";

import "../../../styles/SettingsPage.css";

export function SettingsPage() {
    return (
        <section className="settings-page">
        <PageHeader
            title="Ajustes"
            subtitle="Apariencia y preferencias locales"
            variant="settings"
        />

        <div className="settings-page-content">
            <div className="settings-list">
            <SettingRow label="Tema" options={<ThemeSelector />} />

            <SettingRow
                label="Color de acento"
                options={<AccentColorSelector />}
            />

            <SettingRow label="Fondo" options={<BackgroundSelector />} />

            <SettingRow
                label="Modelo preferido"
                options={<ModelStatus />}
            />
            </div>

            <div className="settings-actions">
            <ResetPreferencesButton />
            </div>
        </div>
        </section>
    );
}
