"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";
import { BsStars } from "react-icons/bs";

const SearchHandler = () => {
  const { state } = useSidebar();
  return (
    <div
      className="flex-col w-full fixed mt-auto bottom-0 bg-white dark:bg-zinc-950 rounded-b-lg z-10"
      style={{
        scrollbarWidth: "none",
        width:
          state === "collapsed" ? "100%" : `calc(100% - var(--sidebar-width))`,
      }}
    >
      <div className="mx-auto max-w-4xl relative border rounded-lg my-2">
        <input
          type="text"
          placeholder="Ask anything"
          className="w-full py-4 px-2 dark:bg-slate-950 bg-slate-100 rounded-lg"
        />
        <Button className="absolute right-2 bottom-2 cursor-pointer">
          Ask <BsStars />
        </Button>
      </div>
    </div>
  );
};

export default SearchHandler;
