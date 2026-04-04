import { Button } from "@/shared/ui/components/Button";

export default function NotFoundPage() {
  return (
    <div className="card">
      <h1>404</h1>

      <p>Page not found</p>

      <Button variant="primary" onClick={() => window.history.back()}>
        Go back
      </Button>
    </div>
  );
}
