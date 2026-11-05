import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  rectoMetadata,
} from "@/components/recto/legal-page";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = rectoMetadata(
  "zh",
  "support",
  "支持",
  "使用 Recto AI 需要帮助？订阅、账号、数据：常见解答和联系方式。",
);

// JSX joins wrapped lines with a space, so each Chinese paragraph stays on one line.
export default function RectoSupportZh() {
  return (
    <LegalPage
      locale="zh"
      title="支持"
      intro="使用 Recto AI 时有疑问或遇到问题？这里有最常见的解答和联系我们的方式。"
    >
      <LegalSection title="联系我们">
        <p>
          请写信至 <a href={`mailto:${CONTACT_EMAIL}?subject=Recto%20AI`}>{CONTACT_EMAIL}</a>，并注明你的手机型号和应用版本（可在“设置”底部查看）。
        </p>
      </LegalSection>

      <LegalSection title="如何取消订阅？">
        <p>
          在 Recto 中，打开“设置 &gt; 管理订阅”。你也可以前往 iPhone 的“设置 &gt; 你的姓名 &gt; 订阅”。请在周期结束前至少 24 小时取消，以免自动续订。
        </p>
      </LegalSection>

      <LegalSection title="如何获得退款？">
        <p>
          退款由 Apple 处理。请在 <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a> 提交申请。
        </p>
      </LegalSection>

      <LegalSection title="我的订阅不见了">
        <p>
          请确认你使用的是同一个 Apple 账户，以及同一个 Recto 账号（如有），然后在订阅页面点击“恢复购买”，或在“设置”中点击“恢复我的购买”。
        </p>
      </LegalSection>

      <LegalSection title="如何删除账号？">
        <p>
          在“设置”中点击“删除我的账号”；如果你在没有账号的情况下使用 Recto，则点击“清除我的数据”。没有有效订阅时，请打开订阅页面底部的“账号”。如果你使用 Apple 登录，请确认 Apple 的请求。你的书籍、段落和对话将被清除。请记得另行取消订阅。
        </p>
      </LegalSection>

      <LegalSection title="如何撤回对 AI 的同意？">
        <p>
          在“设置 &gt; 我的数据”中，点击“与 AI 共享”。在你重新同意之前，不会再向 DeepSeek 发送任何内容。
        </p>
      </LegalSection>

      <LegalSection title="AI 的回答有误或令人不适">
        <p>
          在应用内点击“举报此回答”，或写信给我们并注明书籍和段落。我们会尽快回复。
        </p>
      </LegalSection>
    </LegalPage>
  );
}
