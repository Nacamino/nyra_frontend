import { AppShell } from "./components/layout/AppShell";
import { AppRoutes } from "./app/routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </ThemeProvider>
  );
}

export default App;