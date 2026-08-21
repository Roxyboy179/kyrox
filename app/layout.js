export const metadata = {
  title: "Guidelines",
  description:
    "Read the KyroX guidelines, usage policies, moderation rules and community standards.",
};

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen bg-[#313338] flex items-start justify-center p-6 sm:p-10">
      <div className="w-full max-w-[900px]">

        {/* Discord-style message */}
        <div className="flex gap-4">

          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0 shadow-lg">
            <span className="text-white font-bold text-lg">KX</span>
          </div>

          {/* Message */}
          <div className="min-w-0 flex-1">

            {/* Username */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-semibold text-[15px]">
                KyroX
              </span>

              <span className="bg-[#5865f2] text-white text-[11px] font-semibold px-1.5 py-0.5 rounded">
                BOT
              </span>

              <span className="text-[#949ba4] text-xs">
                21:49
              </span>
            </div>

            {/* Link */}
            <div className="text-[#00a8fc] text-[15px] mb-2">
              https://kyrox-eight.vercel.app/guidelines
            </div>

            {/* Embed */}
            <div className="max-w-[850px] rounded-[22px] bg-[#2b2d31] border border-[#3f4147] overflow-hidden shadow-xl">

              <div className="p-7 sm:p-9">

                {/* Small title */}
                <div className="text-[#dbdee1] text-[15px] mb-6">
                  KyroX
                </div>

                {/* Main title */}
                <h1 className="text-[#6ea8fe] text-[28px] sm:text-[36px] leading-tight font-medium mb-7">
                  KyroX Community Guidelines
                </h1>

                {/* Intro */}
                <p className="text-[#f2f3f5] text-[18px] sm:text-[21px] leading-[1.55] mb-7">
                  Welcome to KyroX. These guidelines explain the rules and
                  standards that apply when using our Discord bot, services,
                  dashboard and community features.
                </p>

                {/* Section 1 */}
                <h2 className="text-white text-[21px] font-semibold mb-2">
                  01. Respect &amp; Community
                </h2>

                <p className="text-[#dbdee1] text-[17px] leading-[1.6] mb-6">
                  Treat other users, server members and the KyroX team with
                  respect. Harassment, threats, hate speech, discrimination,
                  targeted abuse and intentionally disruptive behavior are
                  not tolerated.
                </p>

                {/* Section 2 */}
                <h2 className="text-white text-[21px] font-semibold mb-2">
                  02. Proper Use
                </h2>

                <p className="text-[#dbdee1] text-[17px] leading-[1.6] mb-6">
                  KyroX must only be used for legitimate purposes. Do not use
                  the bot to spam, raid, abuse Discord features, bypass
                  restrictions, distribute malicious content or interfere with
                  the normal operation of Discord servers.
                </p>

                {/* Section 3 */}
                <h2 className="text-white text-[21px] font-semibold mb-2">
                  03. Moderation
                </h2>

                <p className="text-[#dbdee1] text-[17px] leading-[1.6] mb-6">
                  Server administrators are responsible for configuring KyroX
                  correctly. Moderation features should be used fairly and
                  responsibly. Misuse of moderation tools may result in access
                  restrictions or removal of KyroX from the affected server.
                </p>

                {/* Section 4 */}
                <h2 className="text-white text-[21px] font-semibold mb-2">
                  04. Security &amp; Abuse
                </h2>

                <p className="text-[#dbdee1] text-[17px] leading-[1.6] mb-6">
                  Attempts to exploit, attack, overload or compromise KyroX,
                  its dashboard, APIs or related infrastructure are strictly
                  prohibited. Do not attempt to gain unauthorized access to
                  accounts, systems or data.
                </p>

                {/* Section 5 */}
                <h2 className="text-white text-[21px] font-semibold mb-2">
                  05. Content
                </h2>

                <p className="text-[#dbdee1] text-[17px] leading-[1.6] mb-6">
                  Users remain responsible for the content they create,
                  upload, send or manage through KyroX. Illegal, harmful,
                  malicious or abusive content may be removed or reported
                  where appropriate.
                </p>

                {/* Section 6 */}
                <h2 className="text-white text-[21px] font-semibold mb-2">
                  06. Service Availability
                </h2>

                <p className="text-[#dbdee1] text-[17px] leading-[1.6] mb-6">
                  KyroX is provided on an ongoing basis, but availability
                  cannot be guaranteed at all times. Maintenance, updates,
                  outages or technical problems may temporarily affect parts
                  of the service.
                </p>

                {/* Section 7 */}
                <h2 className="text-white text-[21px] font-semibold mb-2">
                  07. Enforcement
                </h2>

                <p className="text-[#dbdee1] text-[17px] leading-[1.6] mb-6">
                  Violations may result in warnings, feature restrictions,
                  temporary suspension or permanent removal of access.
                  Serious violations may be acted upon without prior warning.
                </p>

                {/* Final */}
                <div className="mt-8 pt-6 border-t border-[#404249]">
                  <p className="text-[#949ba4] text-[15px] leading-relaxed">
                    By using KyroX, you acknowledge these guidelines and agree
                    to use the service responsibly. These guidelines may be
                    updated from time to time to reflect changes to KyroX,
                    Discord or applicable requirements.
                  </p>

                  <p className="text-[#6ea8fe] text-[14px] mt-4">
                    Last updated: August 21, 2026
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}