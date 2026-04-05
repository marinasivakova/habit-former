// src/pages/ProfilePage.tsx
import { logout } from "@/features/auth/logout";
import { Button } from "@/shared/ui/components/Button";
import { useTheme } from "@/shared/ui/theme";
import { ImportExport } from "@/widgets/profile/ImportExport";
import { useUserStore } from "@/entities/user/model/store";
import { InputField } from "@/shared/ui/components/InputField";
import { useState } from "react";

const vibeColors = ["#7c5cff", "#ff6b6b", "#00c2a8", "#f59e0b"];
export default function ProfilePage() {
  const { colors } = useTheme();

  const { name, avatarColor, theme, updateUser } = useUserStore();
  const [localName, setLocalName] = useState(name);

  const handleLogout = () => {
    logout();
  };

  const updateProfile = () => {
    updateUser({ name: localName });
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "24px 16px 100px",
      }}
    >
      {/* HEADER CARD */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.surface}, ${colors.primary}11)`,
          borderRadius: "28px",
          padding: "24px",
          border: `1px solid ${colors.border}`,
          boxShadow: `0 10px 30px ${colors.primary}22`,
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: avatarColor,
            margin: "0 auto 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            color: "#fff",
            fontWeight: 700,
            boxShadow: `0 0 20px ${avatarColor}55`,
          }}
        >
          {name.charAt(0).toUpperCase()}
        </div>

        <div style={{ marginTop: "16px" }}>
          <div style={{ fontSize: "14px", opacity: 0.6, marginBottom: "8px" }}>
            Avatar color
          </div>

          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            {vibeColors.map((c) => (
              <div
                key={c}
                onClick={() => updateUser({ avatarColor: c })}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: c,
                  cursor: "pointer",
                  border:
                    c === avatarColor
                      ? `2px solid ${colors.text}`
                      : "2px solid transparent",
                  boxShadow: `0 0 10px ${c}55`,
                }}
              />
            ))}
          </div>
        </div>

        <h2 style={{ color: colors.text, margin: 0 }}>{name}</h2>

        <div style={{ marginTop: "20px" }}>
          <div style={{ fontSize: "14px", opacity: 0.6, marginBottom: "8px" }}>
            Theme
          </div>

          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            {["light", "dark"].map((t) => (
              <div
                key={t}
                onClick={() => updateUser({ theme: t as "light" | "dark" })}
                style={{
                  padding: "8px 14px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  background: theme === t ? colors.primary : colors.surface,
                  color: theme === t ? "#fff" : colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EDIT SECTION */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: colors.surface,
          borderRadius: "20px",
          padding: "20px",
          border: `1px solid ${colors.border}`,
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            marginBottom: "12px",
            fontSize: "14px",
            opacity: 0.6,
          }}
        >
          Edit profile
        </div>
        <InputField
          label="Your name"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
        />

        <Button
          variant="primary"
          style={{ marginTop: "12px", alignSelf: "center" }}
          onClick={updateProfile}
          disabled={!localName}
        >
          Update
        </Button>
      </div>

      {/* IMPORT / EXPORT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: colors.surface,
          borderRadius: "20px",
          padding: "20px",
          border: `1px solid ${colors.border}`,
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            marginBottom: "12px",
            fontSize: "14px",
            opacity: 0.6,
          }}
        >
          Data Management
        </div>
        <ImportExport />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: `${colors.surface}`,
          borderRadius: "20px",
          padding: "20px",
          border: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            marginBottom: "12px",
            fontSize: "14px",
            opacity: 0.6,
          }}
        >
          Settings
        </div>

        <Button
          variant="secondary"
          onClick={handleLogout}
          style={{ alignSelf: "center" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
