import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  rectoMetadata,
} from "@/components/recto/legal-page";
import { CONTACT_EMAIL, PERSON_NAME } from "@/lib/site";

export const metadata: Metadata = rectoMetadata(
  "zh",
  "confidentialite",
  "隐私政策",
  "Recto AI 使用哪些数据、与谁共享，以及如何删除这些数据。",
);

// JSX joins wrapped lines with a space, so each Chinese paragraph stays on one line.
export default function RectoPrivacyZh() {
  return (
    <LegalPage
      locale="zh"
      title="隐私政策"
      intro="Recto AI 收集什么、为什么收集、与谁共享，以及你如何掌控自己的数据。"
      updated="2026年11月5日"
    >
      <LegalSection title="要点">
        <ul>
          <li>书页照片保留在你的手机上：只有识别出的文字会被发送出去。</li>
          <li>讲解所需的文字会发送给位于中国的 DeepSeek，且仅在你同意之后发送。</li>
          <li>没有广告，没有广告追踪，也不出售数据。</li>
          <li>你可以在应用内撤回同意并删除账号。</li>
        </ul>
      </LegalSection>

      <LegalSection title="数据控制者">
        <p>
          {PERSON_NAME}，法国尼斯。联系方式：<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。
        </p>
      </LegalSection>

      <LegalSection title="收集的数据及其用途">
        <ul>
          <li>
            <strong>账号（可选）：</strong>电子邮件地址和登录标识（电子邮件、Apple 或 Google），用于让你登录。没有账号时，匿名会话可让你使用 AI 和你的订阅。
          </li>
          <li>
            <strong>书架：</strong>书名和作者、页码、段落、书页文字、讲解、问题和回答、封面照片，用于保存你的阅读内容。没有账号时，书架保存在你的手机上；有账号时，书架托管在服务器上，以便在你的设备之间同步。
          </li>
          <li>
            <strong>偏好：</strong>让你读不下去的原因、你的领域和阅读习惯，用于调整讲解。
          </li>
          <li>
            <strong>订阅与使用情况：</strong>订阅状态、产品、到期日期、购买记录和 AI 使用计数，用于提供服务并执行使用上限。
          </li>
          <li>
            <strong>技术数据：</strong>Google ML Kit 文字识别在你的手机上运行，但该组件声明会收集技术数据，例如设备标识、诊断信息、性能和使用情况的测量数据。
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="发送给 AI 的内容">
        <p>
          为了回答你，Recto 会向 <strong>DeepSeek</strong> 发送：段落、书页文字、书名和作者、页码、让你读不下去的原因、上一次讲解、你的问题、对话记录、你在这本书中保存的其他段落，以及你拍摄的封面照片（如有）。你的电子邮件地址不会被发送。
        </p>
        <p>
          因此，请避免在问题中填写个人信息。在你同意之前，不会发送任何内容；你可以在“设置 &gt; 我的数据”中撤回同意。在你重新同意之前，AI 将无法使用。
        </p>
      </LegalSection>

      <LegalSection title="法律依据">
        <p>
          账号、书架和订阅：履行合同。向 DeepSeek 发送数据：你的同意。安全和防止滥用：正当利益。法律要求保留的内容：法定义务。
        </p>
      </LegalSection>

      <LegalSection title="服务提供商及所在地">
        <ul>
          <li>
            <strong>Supabase</strong>：托管数据库、封面和登录服务，位于巴黎（欧盟）。
          </li>
          <li>
            <strong>DeepSeek</strong>：生成回答，位于中国（<a href="https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html">DeepSeek 的政策</a>）。
          </li>
          <li>
            <strong>RevenueCat</strong>：管理订阅，位于美国。
          </li>
          <li>
            <strong>Apple 和 Google</strong>：付款、你选择使用时的登录服务，以及技术组件。
          </li>
        </ul>
        <p>
          中国未获得欧盟委员会的充分性认定：当地的保护水平可能低于欧盟，当地主管机关也可能访问这些数据。此项传输以你的明确同意为依据。这些服务提供商只会收到其履行职责所必需的内容。
        </p>
      </LegalSection>

      <LegalSection title="保存期限">
        <p>
          只要你的账号存在，你的数据就会被保存；当你在应用内删除账号时，数据（包括封面）会被清除。如果你使用 Apple 登录，Apple 授权也会在此时被撤销：Apple 会要求你确认。如需清除 RevenueCat 保存的购买数据，请写信给支持团队。服务提供商对已收到的内容适用各自的保存期限，部分购买数据可能因法律原因被保留。
        </p>
      </LegalSection>

      <LegalSection title="你的权利">
        <p>
          你可以要求访问、更正、删除、限制处理或转移你的数据，反对某些处理，并可随时撤回同意。你也可以在“设置”中导出你的段落。如需行使这些权利，请写信至 <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。你还可以向法国数据保护机构 <a href="https://www.cnil.fr/fr/plaintes">CNIL</a> 投诉。
        </p>
      </LegalSection>

      <LegalSection title="最低年龄">
        <p>Recto 面向 15 周岁及以上的用户。未满此年龄的，须取得父母或监护人的同意。</p>
      </LegalSection>

      <LegalSection title="政策变更">
        <p>如发生重大变更，尤其是更换 AI 服务提供商，我们会在应用内通知你，并在必要时再次征求你的同意。</p>
      </LegalSection>
    </LegalPage>
  );
}
