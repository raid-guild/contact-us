/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { FormBuilder } from "@/components/ui/form-builder";
import { Wizard, WizardStep } from "@/components/ui/wizard";
import { FileUpload } from "@/components/ui/file-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import {
  LineChartComponent,
  BarChartComponent,
  AreaChartComponent,
  PieChartComponent,
  sampleData,
} from "@/components/ui/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { FileText, Upload, Edit3, BarChart3, ArrowRight } from "lucide-react";

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
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name as string}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email as string}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter your email"
        />
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

const ReviewStep = ({ data }: StepProps) => {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg bg-muted/50">
        <h3 className="font-semibold mb-2">Personal Information</h3>
        <p>
          <strong>Name:</strong> {(data?.name as string) || "Not provided"}
        </p>
        <p>
          <strong>Email:</strong> {(data?.email as string) || "Not provided"}
        </p>
        <p>
          <strong>Role:</strong> {(data?.role as string) || "Not provided"}
        </p>
      </div>
      <div className="p-4 border rounded-lg bg-muted/50">
        <h3 className="font-semibold mb-2">Project Details</h3>
        <p>
          <strong>Project:</strong>{" "}
          {(data?.projectName as string) || "Not provided"}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {(data?.description as string) || "Not provided"}
        </p>
        <p>
          <strong>Budget:</strong> {(data?.budget as string) || "Not provided"}
        </p>
        <p>
          <strong>Timeline:</strong>{" "}
          {(data?.timeline as string) || "Not provided"}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="confirm" />
        <Label htmlFor="confirm">I confirm all information is correct</Label>
      </div>
    </div>
  );
};

const wizardSteps: WizardStep[] = [
  {
    id: "personal-info",
    title: "Personal Information",
    description: "Tell us about yourself",
    component: <PersonalInfoStep />,
    validation: () => true,
  },
  {
    id: "project-details",
    title: "Project Details",
    description: "Describe your project requirements",
    component: <ProjectDetailsStep />,
    validation: () => true,
  },
  {
    id: "review",
    title: "Review & Confirm",
    description: "Review your information before submitting",
    component: <ReviewStep />,
    validation: () => true,
  },
];

export default function AdvancedComponentsPage() {
  const [formBuilderData, setFormBuilderData] = React.useState<Record<
    string,
    unknown
  > | null>(null);
  const [richTextContent, setRichTextContent] = React.useState("");
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);

  console.log("uploadedFiles", uploadedFiles);

  const handleFormBuilderSubmit = (data: Record<string, unknown>) => {
    setFormBuilderData(data);
    console.log("Form Builder submitted:", data);
  };

  const handleWizardComplete = (data: Record<string, unknown>) => {
    console.log("Wizard completed:", data);
  };

  const handleFileUpload = async (file: File) => {
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("File uploaded:", file.name);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold">Advanced Components</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Complex components for building sophisticated user interfaces with
          RaidGuild theming
        </p>
      </div>

      <Tabs defaultValue="form-builder" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger
            value="form-builder"
            className="flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Form Builder</span>
          </TabsTrigger>
          <TabsTrigger value="wizard" className="flex items-center space-x-2">
            <ArrowRight className="h-4 w-4" />
            <span className="hidden sm:inline">Wizard</span>
          </TabsTrigger>
          <TabsTrigger
            value="file-upload"
            className="flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">File Upload</span>
          </TabsTrigger>
          <TabsTrigger
            value="rich-text"
            className="flex items-center space-x-2"
          >
            <Edit3 className="h-4 w-4" />
            <span className="hidden sm:inline">Rich Text</span>
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Charts</span>
          </TabsTrigger>
        </TabsList>

        {/* Form Builder */}
        <TabsContent value="form-builder" className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-display font-bold">Form Builder</h2>
              <p className="text-muted-foreground">
                Create dynamic forms with different field types and validation
              </p>
            </div>
            <FormBuilder onSubmit={handleFormBuilderSubmit} />

            {formBuilderData && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Form Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(formBuilderData, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Wizard */}
        <TabsContent value="wizard" className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-display font-bold">
                Multi-Step Wizard
              </h2>
              <p className="text-muted-foreground">
                Guide users through complex processes with step-by-step
                navigation
              </p>
            </div>
            <Wizard
              steps={wizardSteps}
              onComplete={handleWizardComplete}
              showProgress={true}
              allowBackNavigation={true}
            />
          </div>
        </TabsContent>

        {/* File Upload */}
        <TabsContent value="file-upload" className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-display font-bold">File Upload</h2>
              <p className="text-muted-foreground">
                Drag and drop file upload with validation and progress tracking
              </p>
            </div>
            <FileUpload
              config={{
                maxFiles: 5,
                maxSize: 5 * 1024 * 1024, // 5MB
                acceptedTypes: [".jpg", ".png", ".pdf", ".doc", ".docx"],
                multiple: true,
              }}
              onFilesSelected={setUploadedFiles}
              onFileUpload={handleFileUpload}
              title="Document Upload"
              description="Upload your project documents and files"
            />
          </div>
        </TabsContent>

        {/* Rich Text Editor */}
        <TabsContent value="rich-text" className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-display font-bold">
                Rich Text Editor
              </h2>
              <p className="text-muted-foreground">
                Full-featured text editor with formatting options and RaidGuild
                styling
              </p>
            </div>
            <RichTextEditor
              content={richTextContent}
              onChange={setRichTextContent}
              placeholder="Start writing your content here..."
              title="Content Editor"
              description="Format your text with the toolbar below"
            />

            {richTextContent && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated HTML</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: richTextContent }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Charts */}
        <TabsContent value="charts" className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-display font-bold">
                Data Visualization
              </h2>
              <p className="text-muted-foreground">
                Interactive charts and graphs with RaidGuild color palette
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChartComponent
                config={{
                  title: "Monthly Revenue",
                  description: "Revenue vs Expenses over time",
                  data: sampleData.monthlyRevenue as any,
                  xKey: "name",
                  height: 300,
                }}
              />

              <BarChartComponent
                config={{
                  title: "Quarterly Performance",
                  description: "Performance vs Target by quarter",
                  data: sampleData.performance as any,
                  xKey: "name",
                  height: 300,
                }}
              />

              <AreaChartComponent
                config={{
                  title: "Revenue Trend",
                  description: "Revenue trend with area fill",
                  data: sampleData.monthlyRevenue as any,
                  xKey: "name",
                  height: 300,
                }}
              />

              <PieChartComponent
                config={{
                  title: "User Distribution",
                  description: "Breakdown of user types",
                  data: sampleData.userStats,
                  height: 300,
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
