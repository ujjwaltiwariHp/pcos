"use client";

import Link from "next/link";
import { SearchX, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 md:px-8 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-150 -z-10" />
        <div className="bg-primary/10 p-6 rounded-full inline-flex">
          <SearchX className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Page Not Found
      </h1>
      
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button asChild variant="default" size="lg" className="gap-2">
          <Link href="/">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="gap-2" onClick={() => window.history.back()}>
          <button type="button">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </Button>
      </div>
    </div>
  );
}
