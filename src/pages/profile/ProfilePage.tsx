import { logout } from "@/features/auth/logout";
import { Button } from "@/shared/ui/components/Button";

export default function ProfilePage() {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="card">
      <Button variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
