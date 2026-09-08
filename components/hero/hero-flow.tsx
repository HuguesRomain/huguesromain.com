"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Profile } from "@/content/types";
import { useChat } from "@/components/chat/use-chat";
import { apiTransport } from "@/lib/chat-transport";
import { PromptBar } from "./prompt-bar";

const EASE = [0.16, 1, 0.3, 1] as const;

const ChatConversation = dynamic(
  () =>
    import("@/components/chat/chat-conversation").then(
      (mod) => mod.ChatConversation,
    ),
  { ssr: false },
);

export function HeroFlow({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const chat = useChat(apiTransport, profile.locale);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    void import("@/components/chat/chat-conversation");
  }, []);

  function handleSend(text: string) {
    setOpen(true);
    setEverOpened(true);
    void chat.send(text);
  }

  return (
    <div className="relative z-10 flex w-full flex-col items-center px-6">
      <div
        className="flex w-full flex-col items-center justify-center gap-8"
        style={{ minHeight: "92svh" }}
      >
        <h1 className="text-center font-serif text-[clamp(3rem,8vw,7rem)] leading-[1.02] tracking-[-0.02em]">
          {profile.heroFirstName} <em>{profile.heroLastName}</em>
        </h1>
        <p className="max-w-xl text-center font-mono text-[12px] uppercase leading-[1.8] tracking-[0.08em] text-text-muted">
          {profile.tagline}
        </p>
        <div className="flex min-h-[132px] w-full items-start justify-center">
          {!open && (
            <motion.div
              layoutId="prompt-bar"
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, ease: EASE }
              }
              className="flex w-full justify-center"
            >
              <PromptBar
                strings={profile.chat}
                disabled={chat.status === "streaming"}
                onSend={handleSend}
                autoFocus={everOpened}
              />
            </motion.div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <ChatConversation
            chat={chat}
            strings={profile.chat}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
