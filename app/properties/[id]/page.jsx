"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";

const PropertiesPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = useParams();
  const name = searchParams.get("names");
  return (
    <div>
      <button className="bg-blue-500 p-2" onClick={() => router.push("/")}>
        Go Home {name}{" "}
      </button>
    </div>
  );
};
export default PropertiesPage;
