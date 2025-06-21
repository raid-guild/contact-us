"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldSchema = z.object({
  id: z.string(),
  type: z.enum(["text", "email", "textarea", "select", "checkbox", "radio"]),
  label: z.string().min(1, "Label is required"),
  required: z.boolean(),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
});

const formBuilderSchema = z.object({
  title: z.string().min(1, "Form title is required"),
  description: z.string().optional(),
  fields: z.array(fieldSchema).min(1, "At least one field is required"),
});

type FormBuilderData = z.infer<typeof formBuilderSchema>;

interface FormBuilderProps {
  onSubmit?: (data: FormBuilderData) => void;
  className?: string;
}

export function FormBuilder({ onSubmit, className }: FormBuilderProps) {
  const form = useForm<FormBuilderData>({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: {
      title: "",
      description: "",
      fields: [{ id: "1", type: "text", label: "", required: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const addField = () => {
    append({
      id: Date.now().toString(),
      type: "text",
      label: "",
      required: false,
    });
  };

  const removeField = (index: number) => {
    remove(index);
  };

  const handleSubmit = (data: FormBuilderData) => {
    onSubmit?.(data);
    console.log("Form Builder Data:", data);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Form Builder</CardTitle>
          <CardDescription>
            Create dynamic forms with different field types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Form Metadata */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Form Title</Label>
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="Enter form title"
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-moloch-500 mt-1">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Enter form description"
                />
              </div>
            </div>

            <Separator />

            {/* Fields */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Form Fields</h3>
                <Button
                  type="button"
                  onClick={addField}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Field Type</Label>
                          <Select
                            value={field.type}
                            onValueChange={(value) =>
                              form.setValue(
                                `fields.${index}.type`,
                                value as
                                  | "text"
                                  | "email"
                                  | "textarea"
                                  | "select"
                                  | "checkbox"
                                  | "radio"
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="textarea">Textarea</SelectItem>
                              <SelectItem value="select">Select</SelectItem>
                              <SelectItem value="checkbox">Checkbox</SelectItem>
                              <SelectItem value="radio">Radio</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Label</Label>
                          <Input
                            {...form.register(`fields.${index}.label`)}
                            placeholder="Field label"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`required-${index}`}
                            checked={field.required}
                            onCheckedChange={(checked) =>
                              form.setValue(
                                `fields.${index}.required`,
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor={`required-${index}`}>Required</Label>
                        </div>
                      </div>

                      <div>
                        <Label>Placeholder</Label>
                        <Input
                          {...form.register(`fields.${index}.placeholder`)}
                          placeholder="Field placeholder"
                        />
                      </div>

                      {(field.type === "select" || field.type === "radio") && (
                        <div>
                          <Label>Options (comma-separated)</Label>
                          <Input
                            {...form.register(`fields.${index}.options`)}
                            placeholder="Option 1, Option 2, Option 3"
                          />
                        </div>
                      )}

                      {form.formState.errors.fields?.[index] && (
                        <p className="text-sm text-moloch-500">
                          {form.formState.errors.fields[index]?.label?.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeField(index)}
                      className="text-muted-foreground hover:text-moloch-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Separator />

            {/* Preview */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Form Preview</h3>
              <Card className="p-6">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold">
                    {form.watch("title") || "Form Title"}
                  </h4>
                  {form.watch("description") && (
                    <p className="text-muted-foreground">
                      {form.watch("description")}
                    </p>
                  )}

                  {fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label>
                        {field.label || "Field Label"}
                        {field.required && (
                          <span className="text-moloch-500 ml-1">*</span>
                        )}
                      </Label>

                      {field.type === "text" && (
                        <Input
                          placeholder={field.placeholder || "Enter text"}
                        />
                      )}

                      {field.type === "email" && (
                        <Input
                          type="email"
                          placeholder={field.placeholder || "Enter email"}
                        />
                      )}

                      {field.type === "textarea" && (
                        <Textarea
                          placeholder={field.placeholder || "Enter text"}
                        />
                      )}

                      {field.type === "select" && (
                        <Select>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                field.placeholder || "Select an option"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option, optionIndex) => (
                              <SelectItem key={optionIndex} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {field.type === "checkbox" && (
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`preview-${field.id}`} />
                          <Label htmlFor={`preview-${field.id}`}>
                            {field.placeholder || "Check this box"}
                          </Label>
                        </div>
                      )}

                      {field.type === "radio" && (
                        <div className="space-y-2">
                          {field.options?.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="radio"
                                name={`radio-${field.id}`}
                                id={`radio-${field.id}-${optionIndex}`}
                              />
                              <Label
                                htmlFor={`radio-${field.id}-${optionIndex}`}
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="moloch">
                Generate Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
