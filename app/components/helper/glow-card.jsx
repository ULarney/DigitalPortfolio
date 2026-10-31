// Reusable card for education and experience entries.
export default function GlowCard({ children, identifier }) {
  return (
    <article
      id={identifier}
      className="relative w-full overflow-hidden rounded-xl border border-[#2a2e5a] bg-[#101123] text-gray-200 transition-colors duration-300 hover:border-teal-400/60"
    >
      {children}
    </article>
  );
}
