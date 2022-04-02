import { VFC } from "react";
import { AppProvider } from "./providers/app";
import { AppRoutes } from "./routes";

const App: VFC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
