import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DPDP & DPA Legal Agreement | Sand AI',
  description: 'Review our Digital Personal Data Protection (DPDP) Act compliance, client Data Processing Agreement (DPA), and consent guidelines.',
}

export default function DpdpPage() {
  return (
    <main className="min-h-screen bg-sand-bg pt-32 pb-24 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sand-purple/5 dark:bg-sand-purple/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="border-b border-sand-border pb-8 mb-12">
          <span className="text-xs font-bold tracking-widest text-sand-purple uppercase bg-sand-purple/10 px-3 py-1.5 rounded-full">
            Legal & Compliance
          </span>
          <h1 className="text-4xl md:text-5xl font-poppins font-black text-sand-textPrimary mt-6 tracking-tight">
            Data Processing Agreement (DPA)
          </h1>
          <p className="text-sm md:text-base text-sand-textSecondary mt-3 font-light leading-relaxed">
            Prepared in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and the DPDP Rules, 2025.
          </p>
        </div>

        {/* Notice Info Banner */}
        <div className="bg-sand-purple/5 border border-sand-purple/20 rounded-2xl p-5 mb-8 text-xs md:text-sm text-sand-textSecondary leading-relaxed italic">
          <strong>Important Note:</strong> This document represents our standard Data Processing Agreement (Client ↔ Sand AI) and Lead-Gen Consent Notice template. When partnering with us, this agreement is executed as part of the Principal Services Agreement.
        </div>

        {/* Document Content */}
        <div className="space-y-12 text-sand-textPrimary text-xs md:text-sm md:leading-relaxed leading-loose">
          
          {/* SECTION 1 */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold font-poppins text-sand-textPrimary tracking-tight border-l-2 border-sand-orange pl-3">
              PART 1 — DATA PROCESSING AGREEMENT (Client ↔ Sand AI)
            </h2>
            <p className="text-sand-textSecondary font-light">
              This Data Processing Agreement (&quot;DPA&quot;) is entered into by and between Sand AI (&quot;Data Processor&quot;) and the Client (&quot;Data Fiduciary&quot;) who engages our services. It governs the processing of personal data on behalf of the client for purposes such as running ad campaigns, lead capture, and CRM integration.
            </p>

            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-sand-border space-y-4">
              <h3 className="font-extrabold text-sm uppercase text-sand-purple">1. Definitions</h3>
              <p className="text-sand-textSecondary font-light">
                Terms such as <strong>&quot;Personal Data&quot;</strong>, <strong>&quot;Data Principal&quot;</strong>, <strong>&quot;Data Fiduciary&quot;</strong>, <strong>&quot;Data Processor&quot;</strong>, <strong>&quot;Processing&quot;</strong>, <strong>&quot;Consent&quot;</strong>, and <strong>&quot;Personal Data Breach&quot;</strong> carry the meanings given to them in the DPDP Act, 2023 and the DPDP Rules, 2025.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-sand-border space-y-4">
              <h3 className="font-extrabold text-sm uppercase text-sand-purple">2. Scope and Roles</h3>
              <p className="text-sand-textSecondary font-light">
                <span className="font-bold">2.1</span> Sand AI processes Personal Data only on behalf of the Client and only to deliver the services described in the Principal Agreement (the &quot;Services&quot;). <br />
                <span className="font-bold">2.2</span> The Client is the Data Fiduciary and determines the purpose and means of Processing. Sand AI acts solely as the Data Processor. <br />
                <span className="font-bold">2.3</span> The details of Processing (categories of data, categories of Data Principals, purpose, duration) are set out in Schedule A.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-sand-border space-y-4">
              <h3 className="font-extrabold text-sm uppercase text-sand-purple">3. Sand AI&apos;s Obligations as Data Processor</h3>
              <p className="text-sand-textSecondary font-light mb-2">
                Sand AI shall:
              </p>
              <ul className="list-decimal pl-5 space-y-2.5 text-sand-textSecondary font-light">
                <li>Process Personal Data only on the Client&apos;s documented instructions and not for any independent purpose.</li>
                <li>Keep Personal Data confidential and ensure that personnel and partners with access are bound by confidentiality.</li>
                <li>Implement reasonable security safeguards (as outlined in Schedule B), including access controls, encryption, and logging/monitoring.</li>
                <li>Retain logs and Personal Data for at least one (1) year to enable detection and investigation of unauthorized access.</li>
                <li>Assist the Client in responding to Data Principal requests (access, correction, erasure, grievance) within required timelines.</li>
                <li>Notify the Client of any Personal Data Breach without undue delay (and in any event within 24 hours) of becoming aware.</li>
                <li>Not engage any sub-processor (e.g. CRM host, automation platform) without the Client&apos;s prior authorization, and flow down equivalent obligations.</li>
                <li>On termination, erase or return all Personal Data, subject to the one-year minimum retention and legal compliance constraints.</li>
                <li>Make available compliance documentation and permit audits on reasonable notice.</li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-sand-border space-y-4">
              <h3 className="font-extrabold text-sm uppercase text-sand-purple">4. Consent and Lawful Basis</h3>
              <p className="text-sand-textSecondary font-light">
                <span className="font-bold">4.1</span> The Client is solely responsible for obtaining and maintaining valid DPDP consent (or another lawful basis) from Data Principals for all Personal Data it provides to, or instructs Sand AI to collect through, the Services.<br />
                <span className="font-bold">4.2</span> This includes consent for uploading or sharing data with advertising platforms (such as Meta Custom Audiences/Conversions API, and Google Customer Match/Enhanced Conversions).<br />
                <span className="font-bold">4.3</span> The Client warrants that its consent notices meet the DPDP Rules requirements of being standalone, plain-language notices with an itemized list of data, specified purpose, and easy withdrawal mechanisms.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-sand-border space-y-4">
              <h3 className="font-extrabold text-sm uppercase text-sand-purple">5. Children&apos;s Data</h3>
              <p className="text-sand-textSecondary font-light">
                The Client shall not provide Sand AI with, or instruct Sand AI to collect, Personal Data of persons under 18 without verifiable parental consent, and shall not instruct any tracking, behavioral monitoring, or targeted advertising directed at children.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-sand-border space-y-4">
              <h3 className="font-extrabold text-sm uppercase text-sand-purple">6. Governing Law and Jurisdiction</h3>
              <p className="text-sand-textSecondary font-light">
                This DPA shall be governed by the laws of India. Any disputes arising under this agreement shall be subject to the exclusive jurisdiction of the courts at Ranchi, Jharkhand.
              </p>
            </div>
          </section>

          {/* SCHEDULES */}
          <section className="space-y-6 border-t border-sand-border pt-12">
            <h2 className="text-xl md:text-2xl font-bold font-poppins text-sand-textPrimary tracking-tight border-l-2 border-sand-orange pl-3">
              SCHEDULES TO THE AGREEMENT
            </h2>
            
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-sand-textPrimary">Schedule A — Details of Processing</h3>
              <table className="w-full text-left border-collapse border border-sand-border text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-white/5">
                    <th className="p-3 border border-sand-border font-bold">Parameter</th>
                    <th className="p-3 border border-sand-border font-bold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-sand-border font-bold">Categories of Data Principals</td>
                    <td className="p-3 border border-sand-border text-sand-textSecondary">Prospects, leads, and clients of the Fiduciary</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-sand-border font-bold">Categories of Personal Data</td>
                    <td className="p-3 border border-sand-border text-sand-textSecondary">Name, phone number, email, business parameters, ad interaction logs</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-sand-border font-bold">Purpose of Processing</td>
                    <td className="p-3 border border-sand-border text-sand-textSecondary">Lead capture from Meta & Google ad campaigns; CRM workflow integration; campaign attribution reports</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-sand-border font-bold">Duration of Processing</td>
                    <td className="p-3 border border-sand-border text-sand-textSecondary">Term of engagement + 1 year mandatory audit retention</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-sm text-sand-textPrimary">Schedule B — Security Safeguards</h3>
              <ul className="list-disc pl-5 space-y-2 text-sand-textSecondary font-light">
                <li>Role-based access controls, unique employee credentials, and mandatory Multi-Factor Authentication (MFA) on administrator accounts.</li>
                <li>Encryption in transit (TLS 1.3) and encryption of critical tables containing PII at rest.</li>
                <li>Audit logging and activity tracking, securely archived for at least one year.</li>
                <li>Regular automated backups and written data-breach handling procedures.</li>
              </ul>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-6 border-t border-sand-border pt-12">
            <h2 className="text-xl md:text-2xl font-bold font-poppins text-sand-textPrimary tracking-tight border-l-2 border-sand-orange pl-3">
              PART 2 — LEAD-GEN CONSENT NOTICE COPY
            </h2>
            <p className="text-sand-textSecondary font-light">
              This copy represents the consent notices implemented across our landing pages and ad forms where Sand AI collects data directly.
            </p>

            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-sand-border space-y-4">
              <h4 className="font-extrabold text-xs uppercase text-sand-orange">A. Short version (Meta / Google Lead Forms)</h4>
              <p className="text-sand-textSecondary leading-relaxed bg-white dark:bg-black/20 p-4 rounded-xl border border-sand-border/50">
                &quot;By submitting this form, I allow Sand AI to use the details I provide — my name, phone number, and email — to contact me about digital marketing services and respond to my enquiry. I can withdraw this consent anytime by writing to hello@sandai.com. See our privacy notice: sandai.com/legal/dpdp.&quot;
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-sand-border space-y-4">
              <h4 className="font-extrabold text-xs uppercase text-sand-orange">B. Full version (Website Forms)</h4>
              <p className="text-sand-textSecondary leading-relaxed bg-white dark:bg-black/20 p-4 rounded-xl border border-sand-border/50">
                <strong>How we use your information:</strong> When you submit this form, Sand AI collects the personal data you provide — name, phone number, and email. We use it only to respond to your enquiry and coordinate service delivery.<br /><br />
                We keep this data only as long as needed for that purpose. We don&apos;t sell your data. You can access, correct, or erase your data, or withdraw consent easily by emailing hello@sandai.com. You can also raise a grievance with our grievance officer at grievance@sandai.com.
              </p>
            </div>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-sand-border text-center">
          <a 
            href="/"
            className="text-xs md:text-sm font-bold text-sand-purple hover:underline"
          >
            ← Back to Homepage
          </a>
        </div>

      </div>
    </main>
  )
}
