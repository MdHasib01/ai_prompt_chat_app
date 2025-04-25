"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import React, { useState } from "react";
import { BsStars } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/store/hooks";
import {
  addBotTyping,
  addUserMessage,
  fetchBotResponse,
} from "@/store/features/prompt/promptSlice";
import { AppDispatch } from "@/store/store";

const SearchHandler = () => {
  const { messages } = useAppSelector((state) => state.chats);

  const dispatch = useDispatch<AppDispatch>();
  const { state, isMobile } = useSidebar();
  const [input, setInput] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(addUserMessage(input));
    dispatch(addBotTyping());
    dispatch(fetchBotResponse(input));
    setInput("");
  };
  return (
    <div
      className="flex-col w-full fixed mt-auto bottom-0 px-4 bg-white dark:bg-zinc-950 rounded-b-lg z-10"
      style={{
        scrollbarWidth: "none",
        width: isMobile ? "100%" : `calc(100% - var(--sidebar-width))`,
      }}
    >
      <div className="mx-auto max-w-4xl relative border rounded-lg my-2">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            className="w-full py-4 px-2 dark:bg-slate-950 bg-slate-100 rounded-lg"
          />
          <Button
            className="absolute right-2 bottom-2 cursor-pointer"
            type="submit"
          >
            Ask <BsStars />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchHandler;
