
import "../../styles/PageHeader.css";
import {
  BrainCircuit,
  Cpu,
  ChevronDown,
  Settings,
} from "lucide-react";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  variant?: "chat" | "settings" | "tools" | "traces";
};

export function PageHeader({
  title,
  subtitle,
  variant = "chat",
}: PageHeaderProps) {
  const Icon = variant === "chat" ? BrainCircuit : Settings;

  return (
    <header className="page-header">
      <div className="page-header-identity">
        <div className="page-header-icon">
          <Icon size={26} strokeWidth={1.7} />
        </div>

        <div>
          <h1 className="page-header-title">{title}</h1>
          <p className="page-header-status">{subtitle}</p>
        </div>
      </div>

      {variant === "chat" && (
        <div className="chat-header-model">
          <Cpu size={18} strokeWidth={1.7} />
          <span>Modelo local</span>
          <ChevronDown size={16} />
        </div>
      )}
    </header>
  );
}
