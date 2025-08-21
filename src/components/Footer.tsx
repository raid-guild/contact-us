import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-neutral-400 text-sm font-body">
          © 2025 RaidGuild
        </div>
        <div>
          <Link
            href="https://discord.gg/raidguild"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 text-sm font-body hover:text-moloch-300 transition-colors"
          >
            Visit us on Discord
          </Link>
        </div>
      </div>
    </footer>
  );
}
