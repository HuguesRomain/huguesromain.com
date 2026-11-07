import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalPage,
  LegalSection,
  rectoMetadata,
} from "@/components/recto/legal-page";
import { CONTACT_EMAIL, PERSON_NAME } from "@/lib/site";

export const metadata: Metadata = rectoMetadata(
  "zh",
  "conditions",
  "使用条款",
  "Recto AI 应用及 Recto AI+ 订阅的使用条款。",
);

// JSX joins wrapped lines with a space, so each Chinese paragraph stays on one line.
export default function RectoTermsZh() {
  return (
    <LegalPage
      locale="zh"
      title="使用条款"
      intro="本条款规范你对 Recto AI 的使用。Recto AI 是一款为你讲解纸质书段落的应用。"
      updated="2026年11月7日"
    >
      <LegalSection title="1. 发布者">
        <p>
          Recto AI 由 {PERSON_NAME} 发布，地址位于法国尼斯。联系方式：<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。
        </p>
      </LegalSection>

      <LegalSection title="2. 服务内容">
        <p>
          Recto 在你的手机上读取你拍摄的书页，借助人工智能讲解你选中的段落，让你就该段落提问，并在你的书架中按书籍整理这些段落。
        </p>
        <p>
          账号并非必需：没有账号时，你的书架保存在手机上，删除应用后会消失；有账号时，书架会在你的设备之间同步。
        </p>
      </LegalSection>

      <LegalSection title="3. Recto AI+ 订阅">
        <ul>
          <li>
            <strong>方案：</strong>按年或按周，价格以购买前应用内显示的为准。
          </li>
          <li>
            <strong>免费试用：</strong>如符合条件，年度方案可能包含 3 天试用。如未在试用期结束前取消，将收取年度费用。
          </li>
          <li>
            <strong>续订：</strong>订阅将按相同时长自动续订，除非你在当前周期结束前至少 24 小时取消。
          </li>
          <li>
            <strong>取消：</strong>在你的 Apple 账户设置中操作。删除应用或删除 Recto 账号不会取消订阅。
          </li>
          <li>
            <strong>付款与退款：</strong>由 Apple 收取款项，并在 <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a> 处理退款申请。
          </li>
          <li>
            <strong>合理使用：</strong>为保护服务，设有每日使用上限，例如每天 300 次讲解。
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. AI 的回答">
        <p>
          讲解由系统自动生成，可能包含错误。它们帮助你理解文本，但不能替代原作或专业意见。请自行核实对你重要的内容，并可在应用内或通过电子邮件举报有问题的回答。
        </p>
      </LegalSection>

      <LegalSection title="5. 你的内容与使用规范">
        <p>
          你的段落和问题仍归你所有。你授权我们仅为运行服务而处理这些内容，具体见<Link href="/zh/recto/confidentialite">《隐私政策》</Link>。
        </p>
        <p>
          请仅将 Recto 用于个人用途。不得利用它传播受保护的作品、规避服务限制或生成违法内容。如发生严重滥用，访问权限可能被暂停。
        </p>
      </LegalSection>

      <LegalSection title="6. 服务可用性与责任">
        <p>
          服务可能因维护而中断，也可能发生变更。本条款的任何内容均不限制法律赋予你作为消费者的权利，尤其是法定的符合性保证。
        </p>
      </LegalSection>

      <LegalSection title="7. 删除账号">
        <p>
          你可以随时在应用的“设置”中删除账号。你的书籍、段落和对话随即会被清除。如果你在没有账号的情况下使用 Recto，“清除我的数据”会在你的手机上执行相同操作。
        </p>
      </LegalSection>

      <LegalSection title="8. Apple">
        <p>
          本条款约束的是你与 {PERSON_NAME} 之间的关系，而非你与 Apple 之间的关系。Apple 不对应用及其内容、维护、支持或与之相关的索赔负责。如果应用不符合适用的保证，你可以通知 Apple，Apple 可能会退还其购买价款；Apple 不承担其他保证义务。Apple 及其子公司是本条款的第三方受益人，并可执行本条款。你声明你并非居住在受美国禁运的国家，也未被列入美国的禁止或限制人员名单。
        </p>
      </LegalSection>

      <LegalSection title="9. 适用法律与条款变更">
        <p>
          本条款受法国法律管辖。如发生争议，请先写信给我们，以寻求友好解决。你仍保留居住国法律赋予你的权利和救济途径。如果本条款发生重大变更，我们会在应用内通知你。
        </p>
      </LegalSection>
    </LegalPage>
  );
}
