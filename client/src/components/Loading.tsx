import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image src="/assets/loading.gif" alt="loading" width={200} height={200} />
    </div>
  );
}
