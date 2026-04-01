import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/components/Button";
import { useTheme } from "@/shared/ui/theme";
import { Tabs } from "./Tabs";
import { logout } from "@/features/auth/logout";
import { useNavigate } from "react-router-dom";
import logoSrc from "@/shared/assets/logo.svg"; // <- import as module
import cls from "./header.module.scss";

const tabs = [{ label: "Habits", route: ROUTES.HOME }];

export const Header = () => {
    const { colors } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    const goHome = () => {
        navigate(ROUTES.HOME);
    };

    return (
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
            <div onClick={goHome} className={cls.logoWrapper}>
                <img src={logoSrc} alt="habit-former" className={cls.logoImg} />
            </div>

            <Tabs tabs={tabs} />

            <Button variant="secondary" onClick={handleLogout}>
                Logout
            </Button>
        </header>
    );
};
