import { logout } from "@/features/auth/logout";
import { Button } from "@/shared/ui/components/Button";
import { useTheme } from "@/shared/ui/theme";

export default function ProfilePage() {
  const { colors } = useTheme();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="card" style={{ paddingBottom: "24px" }}>
      <h2 style={{ color: colors.text, marginBottom: "24px" }}>Profile</h2>
      <Button variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
