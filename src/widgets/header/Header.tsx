import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/components/Button";
import { useTheme } from "@/shared/ui/theme";
import { Tabs } from "./Tabs";

const tabs = [
    { label: "Dashboard", route: ROUTES.HOME },
    // future tabs can be added here
];

export const Header = () => {
    const { colors } = useTheme();
    return (
        <div>
            <header
                style={{
                    backgroundColor: colors.surface,
                    padding: "16px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px solid ${colors.border}`,
                }}
            >
                <h1 style={{ margin: 0 }}>Habit Former</h1>
                <Tabs tabs={tabs} />
                <Button>Logout</Button>
            </header>
        </div>
    );
};
