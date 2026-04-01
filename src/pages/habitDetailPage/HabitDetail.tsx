import { useParams } from "react-router-dom";

export default function HabitDetailPage() {
    const { id } = useParams();
    return <div>Habit Detail Page - ID: {id}</div>;
}
