import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="flex h-screen justify-center py-96 text-9xl">
      <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  );
}
