import { type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../theme";
import { Button } from "./Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const { colors } = useTheme();

    if (!isOpen) return null;

    return createPortal(
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: colors.surface,
                    borderRadius: "16px",
                    padding: "24px",
                    maxWidth: "600px",
                    boxShadow: `0 0 24px ${colors.primary}55`,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                }}
                onClick={(e) => e.stopPropagation()} // prevent closing on inner click
            >
                {title && (
                    <h2
                        style={{
                            margin: 0,
                            marginBottom: "16px",
                            color: colors.text,
                        }}
                    >
                        {title}
                    </h2>
                )}
                <div style={{ marginBottom: "24px", color: colors.text }}>
                    {children}
                </div>
                <div style={{ alignSelf: "flex-end" }}>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>,
        document.body,
    );
};
