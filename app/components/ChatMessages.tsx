"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { RootState } from "@/store/store";

const ChatMessages: React.FC = () => {
  const messages = useSelector((state: RootState) => state.chats.messages);
  const [typingText, setTypingText] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.type === "bot" && !lastMessage.loading) {
      let i = 0;
      setTypingText("");
      const fullText = lastMessage.text;
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setTypingText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(interval);
          setTypingText(fullText); // Ensure final text is complete
        }
      }, 5);
      return () => clearInterval(interval);
    }
  }, [messages]);

  return (
    <div className="p-4 space-y-4flex flex-col">
      <AnimatePresence>
        {messages.map((msg, idx) => {
          const isLast = idx === messages.length - 1;
          const displayText =
            msg.type === "bot" && !msg.loading && isLast
              ? typingText
              : msg.text;

          return (
            <motion.div
              key={msg.id}
              className={`rounded-xl px-4 py-3 w-fit max-w-[75%] break-words ${
                msg.type === "user"
                  ? "bg-sky-200 self-end ml-auto text-black"
                  : "bg-gray-200 self-start text-gray-800"
              }`}
            >
              {msg.type === "bot" ? (
                <div className="prose prose-sm max-w-none my-2">
                  <ReactMarkdown>{displayText}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{displayText}</p>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatMessages;
