import "../../styles/Sidebar.css";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { id: "chat", label: "Chat", icon: "◈", path: "/" },
  { id: "tools", label: "Herramientas", icon: "⚒", path: "/tools" },
  { id: "traces", label: "Trazas", icon: "◉", path: "/traces" },
  { id: "settings", label: "Ajustes", icon: "⚙", path: "/settings" },
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
        {navigationItems.map((item) => (
            <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
            }
            >
            <span className="sidebar-icon" aria-hidden="true">
                {item.icon}
            </span>
            <span>{item.label}</span>
            </NavLink>
        ))}
        </nav>

      <div className="sidebar-footer">
        NYRA Lab · Windows
      </div>
    </aside>
  );
}