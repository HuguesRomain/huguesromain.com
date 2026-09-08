"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Profile } from "@/content/types";
import { ChatPanel } from "@/components/chat/chat-panel";
import { useChat } from "@/components/chat/use-chat";
import { apiTransport } from "@/lib/chat-transport";
import { PromptBar } from "./prompt-bar";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroFlow({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const chat = useChat(apiTransport, profile.locale);
  const reducedMotion = useReducedMotion();

  function handleSend(text: string) {
    setOpen(true);
    void chat.send(text);
  }

  return (
    <div className="relative z-10 flex w-full flex-col items-center px-6">
      <motion.div
        animate={{ minHeight: open ? "44svh" : "92svh" }}
        initial={false}
        transition={
          reducedMotion ? { duration: 0 } : { duration: 0.6, ease: EASE }
        }
        className="flex w-full flex-col items-center justify-center gap-8"
        style={{ minHeight: "92svh" }}
      >
        <motion.h1
          animate={{ scale: open ? 0.6 : 1 }}
          initial={false}
          transition={
            reducedMotion ? { duration: 0 } : { duration: 0.6, ease: EASE }
          }
          style={{ transformOrigin: "center bottom" }}
          className="text-center font-serif text-[clamp(3rem,8vw,7rem)] leading-[1.02] tracking-[-0.02em]"
        >
          {profile.heroFirstName} <em>{profile.heroLastName}</em>
        </motion.h1>
        {!open && (
          <p className="max-w-xl text-center font-mono text-[12px] uppercase leading-[1.8] tracking-[0.08em] text-text-muted">
            {profile.tagline}
          </p>
        )}
        <PromptBar
          strings={profile.chat}
          disabled={chat.status === "streaming"}
          onSend={handleSend}
          onEscape={() => setOpen(false)}
        />
      </motion.div>
      <AnimatePresence>
        {open && (
          <div className="flex w-full justify-center pb-24">
            <ChatPanel
              chat={chat}
              strings={profile.chat}
              onClose={() => setOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
