import { Button } from "@/shared/ui/components/Button";

export default function AuthPage() {
    return (
        <div>
            <Button>Primary Button</Button>
            <Button variant="secondary" style={{ marginLeft: "16px" }}>
                Secondary Button
            </Button>
        </div>
    );
}
