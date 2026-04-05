import { makeUserStorageKey } from "@/app/model/helpers";
import { login } from "@/features/auth/login";
import { useTheme } from "@/shared/ui/theme";

interface IUserCardProps {
  user: any;
}

const getUserPreview = (userId: string) => {
  const raw = localStorage.getItem(
    makeUserStorageKey(userId, "habit-former-user")
  );
  return raw ? JSON.parse(raw) : null;
};
export const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  const { colors } = useTheme();

  const data = getUserPreview(user);
  const avatarColor = data?.avatarColor ?? colors.primary;
  const name = data?.name ?? user;
  return (
    <div
      key={user}
      onClick={() => login(user)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px",
        borderRadius: "16px",
        cursor: "pointer",
        background: `linear-gradient(135deg, ${colors.surface}, ${avatarColor}22)`,
        border: `1px solid ${colors.border}`,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 10px 25px ${avatarColor}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: avatarColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: "16px",
          boxShadow: `0 0 12px ${avatarColor}55`,
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>

      {/* Name */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: colors.text,
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "12px",

            color: colors.mutedText,
          }}
        >
          Tap to continue
        </div>
      </div>

      {/* Arrow */}
      <div style={{ opacity: 0.4, color: colors.text }}>→</div>
    </div>
  );
};
