"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Profile } from "@/content/types";
import { useChat } from "@/components/chat/use-chat";
import { apiTransport } from "@/lib/chat-transport";
import { PromptBar } from "@/components/hero/prompt-bar";
import { Card } from "./card";

const EASE = [0.16, 1, 0.3, 1] as const;

const ChatConversation = dynamic(
  () =>
    import("@/components/chat/chat-conversation").then(
      (mod) => mod.ChatConversation,
    ),
  { ssr: false },
);

export function AiSection({ profile }: { profile: Profile }) {
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
    <section className="flex flex-col gap-4">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-muted">
        {fr ? "Discutez avec moi" : "Talk with me"}
      </h2>
      <Card className="flex flex-col gap-5 p-6 sm:p-7">
        <p className="text-[14px] leading-[1.6] text-text-muted">
          {fr
            ? "Posez-moi vos questions — une version IA de moi répond, entraînée sur mon parcours, mes projets et ma stack."
            : "Ask me anything — an AI version of me answers, trained on my background, projects and stack."}
        </p>
        <div className="flex min-h-[104px] w-full items-start">
          {!open && (
            <motion.div
              layoutId="prompt-bar"
              transition={
                reducedMotion ? { duration: 0 } : { duration: 0.6, ease: EASE }
              }
              className="flex w-full"
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
      </Card>
      <AnimatePresence>
        {open && (
          <ChatConversation
            chat={chat}
            strings={profile.chat}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
