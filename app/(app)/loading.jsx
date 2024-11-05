"use client";
import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex justify-center">
      <Spinner color="primary" size="lg" />
    </div>
  );
}
