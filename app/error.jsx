"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error, _ }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  // console.log(error);

  return (
    <div className="h-[100vh] w-full justify-center items-center flex flex-col">
      <h2>Something went wrong!</h2>
      <h3>{error.toString()}</h3>
    </div>
  );
}
