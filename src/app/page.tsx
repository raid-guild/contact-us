import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-display font-bold tracking-tight text-foreground sm:text-6xl">
              RaidGuild
              <span className="text-moloch-500"> Components</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground font-body">
              We are slaying Moloch, one web3 build at a time. A comprehensive
              component library with RaidGuild&apos;s dark, mystical aesthetic.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/components">
                <Button size="lg" variant="moloch">
                  View Components
                </Button>
              </Link>
              <Link href="/components">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Phase 1 Complete</CardTitle>
                <CardDescription>Core UI Components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="moloch">Button</Badge>
                  <Badge variant="moloch">Input</Badge>
                  <Badge variant="moloch">Card</Badge>
                  <Badge variant="moloch">Badge</Badge>
                  <Badge variant="moloch">Avatar</Badge>
                  <Badge variant="moloch">Separator</Badge>
                  <Badge variant="moloch">Skeleton</Badge>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Essential components with RaidGuild theming including moloch
                  and scroll variants.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display">Form Components</CardTitle>
                <CardDescription>Interactive Elements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="scroll">Label</Badge>
                  <Badge variant="scroll">Textarea</Badge>
                  <Badge variant="scroll">Select</Badge>
                  <Badge variant="scroll">Checkbox</Badge>
                  <Badge variant="scroll">Radio Group</Badge>
                  <Badge variant="scroll">Switch</Badge>
                  <Badge variant="scroll">Slider</Badge>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Complete form system with dark theme and moloch focus states.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display">Brand Colors</CardTitle>
                <CardDescription>Moloch & Scroll Palettes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded bg-moloch-500"></div>
                    <div className="w-6 h-6 rounded bg-moloch-600"></div>
                    <div className="w-6 h-6 rounded bg-moloch-700"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded bg-scroll-600"></div>
                    <div className="w-6 h-6 rounded bg-scroll-700"></div>
                    <div className="w-6 h-6 rounded bg-neutral-700"></div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Exact brand colors from RaidGuild guidelines with semantic
                  mappings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
