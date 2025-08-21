/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Wizard, WizardStep } from "@/components/ui/wizard";
import { Input } from "@/components/ui/input";
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

interface StepProps {
  data?: Record<string, unknown>;
  onUpdate?: (data: Record<string, unknown>) => void;
  isActive?: boolean;
}

// Wizard Step Components
const PersonalInfoStep = ({ data, onUpdate, isActive }: StepProps) => {
  const [formData, setFormData] = React.useState(
    data || { name: "", email: "", role: "" }
  );

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate?.(newData);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-row flex-wrap w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <Label htmlFor="name">
              Name <span className="text-moloch-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name as string}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your full name"
              required={true}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email as string}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role as string}
          onValueChange={(value) => handleChange("role", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const ProjectDetailsStep = ({ data, onUpdate, isActive }: StepProps) => {
  const [formData, setFormData] = React.useState(
    data || {
      projectName: "",
      description: "",
      budget: "",
      timeline: "",
    }
  );

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate?.(newData);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          value={formData.projectName as string}
          onChange={(e) => handleChange("projectName", e.target.value)}
          placeholder="Enter project name"
        />
      </div>
      <div>
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          value={formData.description as string}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe your project"
          rows={4}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="budget">Budget Range</Label>
          <Select
            value={formData.budget as string}
            onValueChange={(value) => handleChange("budget", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">$1K - $10K</SelectItem>
              <SelectItem value="medium">$10K - $50K</SelectItem>
              <SelectItem value="large">$50K+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="timeline">Timeline</Label>
          <Select
            value={formData.timeline as string}
            onValueChange={(value) => handleChange("timeline", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3months">1-3 months</SelectItem>
              <SelectItem value="3-6months">3-6 months</SelectItem>
              <SelectItem value="6+months">6+ months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

const wizardSteps: WizardStep[] = [
  {
    id: "personal-info",
    title: "Who Are You?",
    // description: "Tell us about yourself",
    component: <PersonalInfoStep />,
    validation: () => true,
  },
  {
    id: "project-description",
    title: "Project Description",
    // description: "Describe your project requirements",
    component: <ProjectDetailsStep />,
    validation: () => true,
  },
  {
    id: "project-details",
    title: "Project Details",
    // description: "Describe your project requirements",
    component: <ProjectDetailsStep />,
    validation: () => true,
  },
];

export default function HireUs() {
  const handleWizardComplete = (data: Record<string, unknown>) => {
    console.log("Wizard completed:", data);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold">Hire Us</h1>
      </div>

      {/* Wizard */}
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground">
            Get on our consultation queue. The more information you can provide
            about the work you want to hire Raid Guild for, the better.
          </p>
        </div>
        <Wizard
          steps={wizardSteps}
          onComplete={handleWizardComplete}
          showProgress={false}
          allowBackNavigation={true}
          showSummary={false}
        />
      </div>
    </div>
  );
}
