import { login } from "@/features/auth/login";
import { Button } from "@/shared/ui/components/Button";
import { InputField } from "@/shared/ui/components/InputField";
import { useTheme } from "@/shared/ui/theme";
import { typography } from "@/shared/ui/tokens/typography";
import { useState } from "react";

export default function AuthPage() {
    const { colors } = useTheme();
    const [user, setUser] = useState<string | null>(null);
    const handleSumbit = () => {
        if (!user) return;
        login(user);
    };

    return (
        <div
            style={{
                backgroundColor: colors.background,
                color: colors.text,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                fontFamily: typography.fontFamily,
            }}
        >
            <div
                className="card"
                style={{
                    padding: "36px",
                    margin: "auto",
                    maxWidth: "400px",
                    textAlign: "center",
                    gap: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.surface,
                    borderRadius: "16px",
                    boxShadow: "0px 4px 8px rgba(183, 156, 156, 0.1)",
                }}
            >
                <h1 style={{ color: colors.text }}>Login/Signup</h1>

                <InputField
                    type="text"
                    placeholder="User ID"
                    onChange={(e) => setUser(e.target.value)}
                />

                <Button variant="primary" onClick={handleSumbit}>
                    Login
                </Button>
            </div>
        </div>
    );
}
