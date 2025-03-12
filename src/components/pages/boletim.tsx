"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { memo, Suspense } from "react";

const VideoFrameSection = dynamic(() => import("@/sections/VideoFrameSection").then((mod) => mod.VideoFrameSection));

const BoletimPage: React.FC = () => {
  return (
    <section className="flex flex-col gap-20 justify-center items-center w-full h-full  pt-[2.5rem] pb-20 ">
      <Suspense
        fallback={
          <div className="w-full h-[80vh] flex justify-center">
            <Loader2 className={cn("h-12 w-12  m-auto animate-spin")} />
          </div>
        }
      >
        <VideoFrameSection />
      </Suspense>
    </section>
  );
};

BoletimPage.displayName = "BoletimPage";
export default memo(BoletimPage);
