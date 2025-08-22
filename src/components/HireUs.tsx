/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wizard, WizardStep } from "@/components/ui/wizard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RequiredFieldIndicator,
} from "@/components/ui/form";
import MultipleSelector from "./ui/multiselect";
import {
  BUDGET_OPTIONS,
  SERVICES_OPTIONS,
  TEAM_OPTIONS,
  TIMELINE_OPTIONS,
  PROJECT_PRIORITY_OPTIONS,
} from "@/lib/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// Zod schemas for form validation
const hireUsSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().min(1, {
    message: "Bio is required.",
  }),
  altContactChannel: z.string().optional(),
  altContactName: z.string().optional(),
  projectName: z.string().min(3, {
    message: "Project name is required.",
  }),
  description: z.string().min(10, {
    message: "Description is required.",
  }),
  hasSpecs: z.string().optional(),
  specsLink: z.url().optional(),
  budget: z.string().min(1, {
    message: "Please select a budget range.",
  }),
  timeline: z.string().min(1, {
    message: "Please select a timeline.",
  }),
  services: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .length(1, {
      message: "Please select a service",
    }),
  team: z.string().min(1, {
    message: "Please select a team structure.",
  }),
  projectPriority: z.string().min(1, {
    message: "Please select a project priority.",
  }),
});

type HireUsFormData = z.infer<typeof hireUsSchema>;

interface StepProps {
  form: ReturnType<typeof useForm<HireUsFormData>>;
  isActive?: boolean;
}

const PersonalInfoStep = ({ form, isActive }: StepProps) => {
  if (!isActive) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-row flex-wrap w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <RequiredFieldIndicator />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email Address <RequiredFieldIndicator />
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Bio <RequiredFieldIndicator />
            </FormLabel>
            <FormControl>
              <Textarea placeholder="Introduce yourself" rows={4} {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="altContactName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alternative Contact Method</FormLabel>
            <div className="flex">
              <FormControl>
                <Input
                  placeholder="Username"
                  className="rounded-r-none border-r-0"
                  {...field}
                />
              </FormControl>
              <FormField
                control={form.control}
                name="altContactChannel"
                render={({ field: dropdownField }) => (
                  <Select
                    onValueChange={dropdownField.onChange}
                    defaultValue={dropdownField.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-l-none w-32">
                        <SelectValue placeholder="Discord" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DISCORD">Discord</SelectItem>
                      <SelectItem value="TELEGRAM">Telegram</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const ProjectDetailsStep = ({ form, isActive }: StepProps) => {
  if (!isActive) return null;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="projectName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Project Name <RequiredFieldIndicator />
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter project name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Project Description <RequiredFieldIndicator />
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Provide a detailed description of your project requirements and
              goals."
                rows={7}
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="specsLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you have project specs?</FormLabel>
            {/* <div className="flex">
              <FormField
                control={form.control}
                name="hasSpecs"
                render={({ field: dropdownField }) => (
                  <Select
                    onValueChange={dropdownField.onChange}
                    defaultValue={dropdownField.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-r-none w-40">
                        <SelectValue placeholder="None" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NONE">None</SelectItem>
                      <SelectItem value="PARTIAL">Partial</SelectItem>
                      <SelectItem value="YES">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              /> */}
            <FormControl>
              <Input
                placeholder="URL"
                // className="rounded-l-none border-l-0"
                {...field}
              />
            </FormControl>
            {/* </div> */}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const RequirementsStep = ({ form, isActive }: StepProps) => {
  if (!isActive) return null;

  return (
    <div className="space-y-4">
      <div className="mb-10">
        <FormField
          control={form.control}
          name="projectPriority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are your Priorities?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-10"
                >
                  {PROJECT_PRIORITY_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <label
                        htmlFor={option.value}
                        className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Budget Range <RequiredFieldIndicator />
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BUDGET_OPTIONS.map((o) => {
                    return (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Timeline <RequiredFieldIndicator />
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TIMELINE_OPTIONS.map((o) => {
                    return (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Services Needed <RequiredFieldIndicator />
              </FormLabel>
              <MultipleSelector
                onChange={field.onChange}
                options={SERVICES_OPTIONS}
                placeholder="Select"
                hideClearAllButton={true}
                hidePlaceholderWhenSelected={true}
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Team Details <RequiredFieldIndicator />
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TEAM_OPTIONS.map((o) => {
                    return (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default function HireUs() {
  const form = useForm<HireUsFormData>({
    resolver: zodResolver(hireUsSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      altContactChannel: "DISCORD",
      altContactName: "",
      projectName: "",
      description: "",
      hasSpecs: "NONE",
      specsLink: "",
      budget: "",
      timeline: "",
      services: undefined,
      team: "",
      projectPriority: PROJECT_PRIORITY_OPTIONS[0].value,
    },
  });

  // Validation functions for each step
  const validatePersonalInfo = async () => {
    const result = await form.trigger(["name", "email", "bio"]);
    return result;
  };

  const validateProjectDetails = async () => {
    const result = await form.trigger(["projectName", "description"]);
    return result;
  };

  const validateRequirements = async () => {
    const result = await form.trigger([
      "budget",
      "timeline",
      "services",
      "team",
      "projectPriority",
    ]);
    return result;
  };

  const handleWizardComplete = () => {
    const formData = form.getValues();
    console.log("Wizard completed:", formData);
    // Here you would typically submit the form data to your backend
    // massage data
    // // project spec enum based on url in link field
    // // services map values
    // // team maps to additonal info
  };

  const wizardSteps: WizardStep[] = [
    {
      id: "personal-info",
      title: "Contact Info",
      // description: "Tell us about yourself",
      component: <PersonalInfoStep form={form} />,
      validation: validatePersonalInfo,
    },
    {
      id: "project-description",
      title: "Project Description",
      // description: "Describe your project requirements",
      component: <ProjectDetailsStep form={form} />,
      validation: validateProjectDetails,
    },
    {
      id: "requirements",
      title: "Requirements & Timeline",
      // description: "Specific requirements and timeline details",
      component: <RequirementsStep form={form} />,
      validation: validateRequirements,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold">Hire Us</h1>
        <div className="mx-auto w-full sm:w-3/4">
          <p className="text-muted-foreground text-center">
            Get on our consultation queue. The more information you can provide
            about the work you want to hire Raid Guild for, the better.
          </p>
        </div>
      </div>

      {/* Wizard */}
      <div className="space-y-4">
        <Form {...form}>
          <Wizard
            steps={wizardSteps}
            onComplete={handleWizardComplete}
            showProgress={false}
            allowBackNavigation={true}
            showSummary={false}
          />
        </Form>
      </div>
    </div>
  );
}
