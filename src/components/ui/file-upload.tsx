"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Upload, File, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileUploadConfig {
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  multiple?: boolean;
}

export interface UploadedFile {
  id: string;
  file: File;
  status: "uploading" | "success" | "error";
  progress: number;
  error?: string;
}

interface FileUploadProps {
  config?: FileUploadConfig;
  onFilesSelected?: (files: File[]) => void;
  onFileUpload?: (file: File) => Promise<void>;
  onFileRemove?: (fileId: string) => void;
  className?: string;
  title?: string;
  description?: string;
}

export function FileUpload({
  config = {},
  onFilesSelected,
  onFileUpload,
  onFileRemove,
  className,
  title = "Upload Files",
  description = "Drag and drop files here or click to browse",
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    maxFiles = 10,
    maxSize = 10 * 1024 * 1024, // 10MB default
    acceptedTypes = [],
    multiple = true,
  } = config;

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File size exceeds ${(maxSize / (1024 * 1024)).toFixed(
        1
      )}MB limit`;
    }

    // Check file type
    if (acceptedTypes.length > 0) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const mimeType = file.type;

      const isValidType = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExtension === type.slice(1);
        }
        return mimeType.startsWith(type);
      });

      if (!isValidType) {
        return `File type not allowed. Accepted types: ${acceptedTypes.join(
          ", "
        )}`;
      }
    }

    return null;
  };

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    // Validate files
    fileArray.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    // Show errors if any
    if (errors.length > 0) {
      console.error("File validation errors:", errors);
      // You could add a toast notification here
    }

    // Check max files limit
    if (uploadedFiles.length + validFiles.length > maxFiles) {
      console.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Add files to state
    const newUploadedFiles: UploadedFile[] = validFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      status: "uploading",
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);

    // Notify parent component
    onFilesSelected?.(validFiles);

    // Handle upload if callback provided
    if (onFileUpload) {
      for (const uploadedFile of newUploadedFiles) {
        try {
          // Simulate upload progress
          const progressInterval = setInterval(() => {
            setUploadedFiles((prev) =>
              prev.map((f) =>
                f.id === uploadedFile.id
                  ? { ...f, progress: Math.min(f.progress + 10, 90) }
                  : f
              )
            );
          }, 100);

          await onFileUpload(uploadedFile.file);

          clearInterval(progressInterval);

          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id
                ? { ...f, status: "success", progress: 100 }
                : f
            )
          );
        } catch (error) {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id
                ? {
                    ...f,
                    status: "error",
                    error:
                      error instanceof Error ? error.message : "Upload failed",
                  }
                : f
            )
          );
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    onFileRemove?.(fileId);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="font-display">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragOver
                ? "border-moloch-500 bg-moloch-500/10"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Drop files here</p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse your files
            </p>
            <Button onClick={handleBrowseClick} variant="outline">
              Browse Files
            </Button>

            {/* File restrictions info */}
            <div className="mt-4 text-xs text-muted-foreground space-y-1">
              <p>Max files: {maxFiles}</p>
              <p>Max size: {formatFileSize(maxSize)}</p>
              {acceptedTypes.length > 0 && (
                <p>Accepted types: {acceptedTypes.join(", ")}</p>
              )}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={acceptedTypes.join(",")}
            onChange={handleFileInputChange}
            className="hidden"
          />

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-sm font-medium">
                  Uploaded Files ({uploadedFiles.length}/{maxFiles})
                </h3>
                {uploadedFiles.map((uploadedFile) => (
                  <div
                    key={uploadedFile.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <File className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {uploadedFile.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(uploadedFile.file.size)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Status indicator */}
                      {uploadedFile.status === "uploading" && (
                        <div className="flex items-center space-x-2">
                          <ProgressBar
                            value={uploadedFile.progress}
                            className="w-20 h-1"
                          />
                          <span className="text-xs text-muted-foreground">
                            {uploadedFile.progress}%
                          </span>
                        </div>
                      )}

                      {uploadedFile.status === "success" && (
                        <Badge
                          variant="secondary"
                          className="bg-scroll-500 text-black"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      )}

                      {uploadedFile.status === "error" && (
                        <Badge variant="moloch">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Error
                        </Badge>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadedFile.id)}
                        className="text-muted-foreground hover:text-moloch-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
