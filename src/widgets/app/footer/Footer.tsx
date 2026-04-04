// src/widgets/FooterNav.tsx
import { ROUTES } from "@/shared/config/routes";
import { useTheme } from "@/shared/ui/theme";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Home", path: ROUTES.OVERVIEW },
  { label: "Habits", path: ROUTES.HABIT_LIST },
  { label: "History", path: ROUTES.HISTORY },
  { label: "Profile", path: ROUTES.PROFILE },
];

export const FooterNav = () => {
  const { colors } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(500px, 95%)",
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: "20px",
        display: "flex",
        justifyContent: "space-around",
        padding: "8px",
        boxShadow: `0 8px 24px ${colors.primary}33`,
        backdropFilter: "blur(10px)",
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;

        return (
          <div
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "10px 0",
              borderRadius: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: isActive ? colors.primary : "transparent",
              color: isActive ? "#fff" : colors.text,
              fontWeight: isActive ? 600 : 400,
              boxShadow: isActive ? `0 0 12px ${colors.primary}` : "none",
            }}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
};
