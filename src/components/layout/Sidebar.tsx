import "../../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  MessageSquare,
  Wrench,
  Activity,
  Settings,
  Monitor,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { ConversationList } from "../../features/chat/components/ConversationList";
import { useChat } from "../../features/chat/hooks/useChat";


const navigationItems = [
  { id: "chat", label: "Chat", icon: MessageSquare, path: "/" },
  { id: "tools", label: "Herramientas", icon: Wrench, path: "/tools" },
  { id: "traces", label: "Trazas", icon: Activity, path: "/traces" },
];

export function Sidebar() {
const {
  conversations,
  activeConversationId,
  selectConversation,
  createConversation,
} = useChat();

  const navigate = useNavigate();
  const location = useLocation();

  const isChatPage = location.pathname === "/";

  const handleSelectConversation = (id: string) => {
    selectConversation(id);
    navigate("/");
  };
  const handleNewChat = () => {
  createConversation();
  navigate("/");
  };
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
      {isChatPage && (
      <ConversationList
        conversations={conversations}
        activeConversationId={activeConversationId ?? ""}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
      />
    )}

    <div className="sidebar-settings">
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
        }
      >
        <Settings size={19} strokeWidth={1.8} />
        <span>Ajustes</span>
      </NavLink>
    </div>

      <div className="sidebar-footer">
        <Monitor size={16} aria-hidden="true" />
        <span>NYRA Lab · Windows</span>
      </div>
    </aside>
  );
}
