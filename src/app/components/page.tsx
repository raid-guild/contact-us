import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold text-foreground">
            RaidGuild Component Library
          </h1>
          <p className="text-xl text-muted-foreground font-body">
            Phase 1: Core UI Components
          </p>
        </div>

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Buttons</CardTitle>
            <CardDescription>
              All button variants with RaidGuild theming
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="moloch">Moloch</Button>
              <Button variant="scroll">Scroll</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🎯</Button>
            </div>
          </CardContent>
        </Card>

        {/* Inputs Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Inputs</CardTitle>
            <CardDescription>
              Form inputs with moloch focus states
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea id="textarea" placeholder="Enter your message..." />
            </div>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Cards</CardTitle>
            <CardDescription>
              Dark background with subtle borders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Card 1</CardTitle>
                  <CardDescription>This is a sample card</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card content goes here with some sample text.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Card 2</CardTitle>
                  <CardDescription>Another sample card</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>More card content with different information.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Card 3</CardTitle>
                  <CardDescription>Third sample card</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Final card content to complete the set.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Badges</CardTitle>
            <CardDescription>Moloch and scroll variants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge variant="default">Default</Badge>
              <Badge variant="moloch">Moloch</Badge>
              <Badge variant="scroll">Scroll</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Avatar Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Avatars</CardTitle>
            <CardDescription>With RaidGuild styling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>RG</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        {/* Separator */}
        <Separator />

        {/* Form Components Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Form Components</CardTitle>
            <CardDescription>
              All form elements with RaidGuild theming
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Select */}
            <div className="space-y-2">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>

            {/* Radio Group */}
            <div className="space-y-2">
              <Label>Select your favorite color</Label>
              <RadioGroup defaultValue="moloch">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moloch" id="moloch" />
                  <Label htmlFor="moloch">Moloch Red</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scroll" id="scroll" />
                  <Label htmlFor="scroll">Scroll Gold</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neutral" id="neutral" />
                  <Label htmlFor="neutral">Neutral Gray</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Switch */}
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <Label htmlFor="volume">Volume</Label>
              <Slider id="volume" defaultValue={[33]} max={100} step={1} />
            </div>
          </CardContent>
        </Card>

        {/* Skeleton Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Skeleton</CardTitle>
            <CardDescription>Loading states with dark theme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
