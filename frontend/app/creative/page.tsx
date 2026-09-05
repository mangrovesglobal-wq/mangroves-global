import Link from "next/link";

export default function CreativePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <div className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold mb-4">
          Division 03
        </div>
        <h1 className="text-4xl font-bold text-mangrove-900 mb-4">Advertising &amp; Creative</h1>
        <p className="text-mangrove-800/60 mb-8">This page is under construction.</p>
        <Link href="/" className="text-sm underline text-mangrove-800">
          Back to Mangroves Global
        </Link>
      </div>
    </div>
  );
}