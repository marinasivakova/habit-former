import { useAuthStore } from "@/entities/auth/model/store";
import { login } from "@/features/auth/login";
import { Button } from "@/shared/ui/components/Button";
import { InputField } from "@/shared/ui/components/InputField";
import { useTheme } from "@/shared/ui/theme";
import { typography } from "@/shared/ui/tokens/typography";
import { UserCard } from "@/widgets/auth/UserCard";
import { useState } from "react";

export default function AuthPage() {
  const { colors } = useTheme();
  const [user, setUser] = useState<string | null>(null);
  const users = useAuthStore((s) => s.users);

  const handleSumbit = () => {
    if (!user) return;
    login(user);
  };

  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${colors.background}, ${colors.surface})`,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: typography.fontFamily,
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: colors.surface,
          borderRadius: "24px",
          padding: "28px",
          border: `1px solid ${colors.border}`,
          boxShadow: `0 20px 50px ${colors.primary}22`,
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "24px",
            color: colors.text,
          }}
        >
          {users?.length ? "Welcome back!" : "Sign up or login"}
        </h1>

        {/* USERS LIST */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          {users.map((u) => {
            return <UserCard key={u} user={u} />;
          })}
        </div>

        {/* DIVIDER */}
        {users?.length > 0 ? (
          <div
            style={{
              textAlign: "center",
              margin: "16px 0",
              fontSize: "12px",
              opacity: 0.5,
              color: colors.mutedText,
              fontWeight: 600,
            }}
          >
            or create new
          </div>
        ) : null}

        {/* INPUT */}
        <InputField
          type="text"
          placeholder="Enter new user ID"
          onChange={(e) => setUser(e.target.value)}
        />

        <Button
          variant="primary"
          onClick={handleSumbit}
          style={{ marginTop: "12px", width: "100%" }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
