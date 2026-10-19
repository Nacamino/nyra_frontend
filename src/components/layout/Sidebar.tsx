import "../../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  MessageSquare,
  Wrench,
  Activity,
  Settings,
  Monitor,
} from "lucide-react";


const navigationItems = [
  { id: "chat", label: "Chat", icon: MessageSquare, path: "/" },
  { id: "tools", label: "Herramientas", icon: Wrench, path: "/tools" },
  { id: "traces", label: "Trazas", icon: Activity, path: "/traces" },
  { id: "settings", label: "Ajustes", icon: Settings, path: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">✧</span>

        <div>
          <h2>NYRA</h2>
          <p>AI ASSISTANT LAB</p>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Navegación principal">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
              }
            >
              <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <Monitor size={16} aria-hidden="true" />
        <span>NYRA Lab · Windows</span>
      </div>
    </aside>
  );
}
