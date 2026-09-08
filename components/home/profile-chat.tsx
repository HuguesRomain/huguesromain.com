"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Profile } from "@/content/types";
import { useChat } from "@/components/chat/use-chat";
import { apiTransport } from "@/lib/chat-transport";
import { PromptBar } from "@/components/hero/prompt-bar";

const EASE = [0.16, 1, 0.3, 1] as const;

const ChatConversation = dynamic(
  () =>
    import("@/components/chat/chat-conversation").then(
      (mod) => mod.ChatConversation,
    ),
  { ssr: false },
);

export function ProfileChat({ profile }: { profile: Profile }) {
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
    <div className="flex flex-col gap-2">
      {!open ? (
        <p className="text-[13px] font-semibold tracking-[-0.01em]">
          {fr ? "Parle-moi" : "Talk to me now"}
        </p>
      ) : null}
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
              align="start"
            />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <ChatConversation
            chat={chat}
            strings={profile.chat}
            name={profile.name}
            portrait={profile.about.portrait}
            portraitAlt={profile.about.portraitAlt}
            onlineLabel={fr ? "En ligne" : "Active now"}
            typingLabel={
              fr ? "Hugues est en train d'écrire" : "Hugues is typing"
            }
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
