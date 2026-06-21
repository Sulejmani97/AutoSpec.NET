import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      404 Not Found
      <Link className="font-bold" to={"/"}>
        Back to home
      </Link>
    </div>
  );
}
