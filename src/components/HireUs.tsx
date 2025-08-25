"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  TIMELINE_OPTIONS,
  PROJECT_PRIORITY_OPTIONS,
  CONTACT_CHANNEL_OPTIONS,
} from "@/lib/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  hireUsFormSchema,
  type HireUsFormData,
  transformFormDataToApiFormat,
} from "@/lib/validation";
import Image from "next/image";

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
              What Is Your Role? <RequiredFieldIndicator />
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
                      {CONTACT_CHANNEL_OPTIONS.map((o) => {
                        return (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        );
                      })}
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
              Your Org/Project&apos;s Name <RequiredFieldIndicator />
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Protocol to passion project, what do you go by?"
                {...field}
              />
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
              What do you need? <RequiredFieldIndicator />
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="What can we at RaidGuild build/scope/design/source for you?"
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
                  className="flex flex-row gap-5 md:gap-10"
                >
                  {PROJECT_PRIORITY_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <label
                        htmlFor={option.value}
                        className="text-sm md:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
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
      </div>
    </div>
  );
};

export default function HireUs() {
  // State management for user feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<
    Array<{ field: string; message: string }>
  >([]);

  const form = useForm<HireUsFormData>({
    resolver: zodResolver(hireUsFormSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      altContactChannel: "DISCORD",
      altContactName: "",
      projectName: "",
      description: "",
      specsLink: "",
      budget: "",
      timeline: "",
      services: undefined,
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
      "projectPriority",
    ]);
    return result;
  };

  const handleWizardComplete = async () => {
    if (isSubmitting) return; // Prevent multiple submissions

    const formData = form.getValues();
    console.log("Wizard completed:", formData);

    // Reset states
    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setErrorMessage("");
    setValidationErrors([]);

    // Transform form data to API format using the centralized function
    const consultData = transformFormDataToApiFormat(formData);

    try {
      // For now, we'll need a token. You might want to get this from your auth system
      const token = "your-auth-token-here"; // Replace with actual token logic

      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ consultData }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Consultation submitted successfully:", result);
        setSubmissionStatus("success");
        // Reset form after successful submission
        form.reset();
      } else {
        console.error("Failed to submit consultation:", result);
        setSubmissionStatus("error");

        // Handle validation errors
        if (result.details && Array.isArray(result.details)) {
          console.error("Validation errors:", result.details);
          setValidationErrors(result.details);
          setErrorMessage("Please fix the validation errors below.");
        } else {
          setErrorMessage(
            result.error || "Failed to submit consultation. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Error submitting consultation:", error);
      setSubmissionStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Feedback components
  const SuccessState = () => (
    <div className="text-center space-y-4 p-8">
      <div className="flex items-center justify-center">
        <Image
          src="/raid-cup-fire-success.svg"
          alt="raidg guild swords"
          width="150"
          height="150"
        />
      </div>
      <h3 className="text-2xl font-semibold text-scroll-400">
        The Fires Have Been Lit!
      </h3>

      <a
        className="text-neutral-400 text-sm font-body hover:text-moloch-300 transition-colors"
        href="https://discord.gg/raidguild"
        target="_blank"
      >
        Introduce yourself in our Discord
      </a>
    </div>
  );

  const ErrorState = () => (
    <div className="space-y-4 p-6 border rounded-lg bg-scroll-500">
      <p className="text-moloch-500">{errorMessage}</p>

      {validationErrors.length > 0 && (
        <div className="mt-4 text-lg">
          <h4 className="font-medium text-moloch-800 mb-2">
            Please fix the following issues:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-base text-moloch-600">
            {validationErrors.map((error, index) => (
              <li key={index}>
                <span className="font-medium">{error.field}:</span>{" "}
                {error.message}
              </li>
            ))}

            <li>poopin</li>
          </ul>
        </div>
      )}

      <button
        onClick={() => {
          setSubmissionStatus("idle");
          setErrorMessage("");
          setValidationErrors([]);
        }}
        className="bg-neutral-800 text-moloch-500 font-header text-lg uppercase tracking-wide mt-5 px-6 py-2 border-2 border-neutral-800 rounded-lg hover:bg-moloch-500 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  const LoadingIndicator = () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center animate-spin [animation-duration:7s]">
          <Image
            src="/raid-hour-glass.svg"
            alt="raidg guild swords"
            width="150"
            height="150"
          />
        </div>
      </div>
    </div>
  );

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
        <div className="mx-auto w-full sm:w-3/">
          {submissionStatus === "success" ? (
            <p className=" text-center">
              Your request has been received. A member of the Guild will be in
              touch with you soon.
            </p>
          ) : (
            <p className="text-center">
              Get on our consultation queue. The more information you can
              provide about the work you want to hire Raid Guild for, the
              better.
            </p>
          )}
        </div>
      </div>

      {/* Wizard */}
      <div className="space-y-4">
        <Form {...form}>
          {submissionStatus === "success" ? (
            <SuccessState />
          ) : submissionStatus === "error" ? (
            <ErrorState />
          ) : isSubmitting ? (
            <LoadingIndicator />
          ) : (
            <Wizard
              steps={wizardSteps}
              onComplete={handleWizardComplete}
              showProgress={false}
              allowBackNavigation={true}
              showSummary={false}
            />
          )}
        </Form>
      </div>
    </div>
  );
}
