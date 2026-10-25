import { Routes, Route } from "react-router-dom";

import { ChatPage } from "../../features/chat/pages/ChatPage";
// import { ToolsPage } from "../../features/tools/pages/ToolsPage";
import { TracesPage } from "../../features/traces/pages/TracesPage";
// import { SettingsPage } from "../../features/settings/pages/SettingsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/traces" element={<TracesPage />} />
    </Routes>
  );
}