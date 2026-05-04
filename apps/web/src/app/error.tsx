"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 md:px-8 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-destructive/10 rounded-full blur-3xl scale-150 -z-10" />
        <div className="bg-destructive/10 p-6 rounded-full inline-flex">
          <AlertCircle className="w-16 h-16 text-destructive" strokeWidth={1.5} />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Something went wrong
      </h1>
      
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        We apologize for the inconvenience. An unexpected error occurred while trying to process your request.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button onClick={reset} variant="default" size="lg" className="gap-2">
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </Button>
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/">
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
