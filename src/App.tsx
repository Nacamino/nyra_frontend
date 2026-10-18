import { AppShell } from "./components/layout/AppShell";
import { AppRoutes } from "./app/routes/AppRoutes";

function App() {
  return (
    <AppShell>
      <AppRoutes />
    </AppShell>
  );
}

export default App;