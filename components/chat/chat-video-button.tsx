"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Video, VideoOff } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";

export const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Convert isVideo to a boolean
  const isVideo = searchParams?.get("video") === "true";

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname || "/",
      query: {
        video: isVideo ? undefined : "true", // Use a string for consistency
      }
    }, { skipNull: true });

    router.push(url);
  }
  
  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End video call" : "Start video call";

  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button 
        onClick={onClick} 
        className="hover:opacity-75 transition mr-4"
        aria-label={tooltipLabel}
      >
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
}
