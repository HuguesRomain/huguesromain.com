"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Profile } from "@/content/types";
import { useChat } from "@/components/chat/use-chat";
import { apiTransport } from "@/lib/chat-transport";
import { PromptBar } from "@/components/hero/prompt-bar";
import { BentoCard, CardLabel } from "./card";

const EASE = [0.16, 1, 0.3, 1] as const;

const ChatConversation = dynamic(
  () =>
    import("@/components/chat/chat-conversation").then(
      (mod) => mod.ChatConversation,
    ),
  { ssr: false },
);

export function AiCard({ profile }: { profile: Profile }) {
  const fr = profile.locale === "fr";
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
    <BentoCard className="col-span-6">
      <div className="flex flex-col items-center gap-7 px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <CardLabel>{fr ? "Assistant IA" : "AI assistant"}</CardLabel>
          <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-[-0.02em]">
            {fr ? "Posez vos questions à mon IA" : "Ask my AI anything"}
          </h2>
          <p className="max-w-[480px] text-[14px] leading-[1.6] text-text-muted">
            {fr
              ? "Elle connaît mon parcours, mes projets et ma stack — et répond à ma place, en direct."
              : "It knows my background, projects and stack — and answers on my behalf, live."}
          </p>
        </div>
        <div className="flex min-h-[110px] w-full items-start justify-center">
          {!open && (
            <motion.div
              layoutId="prompt-bar"
              transition={
                reducedMotion ? { duration: 0 } : { duration: 0.6, ease: EASE }
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
    </BentoCard>
  );
}
