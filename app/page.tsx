import Link from "next/link";

export default async function Home() {
  return (
    <div className="p-20">
      <Link href="/login">Hello</Link>
    </div>
  );
}
