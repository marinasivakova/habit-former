import { HashRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { ThemeProvider } from "@/shared/ui/theme";

function App() {
    return (
        <HashRouter>
            <ThemeProvider>
                <AppRoutes />
            </ThemeProvider>
        </HashRouter>
    );
}

export default App;
