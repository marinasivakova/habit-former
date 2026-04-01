import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { ThemeProvider } from "@/shared/ui/theme";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AppRoutes />
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
