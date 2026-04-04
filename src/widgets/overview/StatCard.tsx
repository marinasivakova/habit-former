// small internal component
export const StatCard = ({
  title,
  value,
  subtitle,
  colors,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: any;
}) => {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "18px",
        background: `linear-gradient(135deg, ${colors.surface}, ${colors.primary}08)`,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 6px 16px ${colors.primary}11`,
      }}
    >
      <div style={{ fontSize: "12px", opacity: 0.6 }}>{title}</div>

      <div
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: colors.text,
        }}
      >
        {value}
      </div>

      {subtitle && (
        <div style={{ fontSize: "12px", opacity: 0.5 }}>{subtitle}</div>
      )}
    </div>
  );
};
