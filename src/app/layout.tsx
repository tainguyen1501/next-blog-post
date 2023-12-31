import type { Metadata } from "next";
import SessionProvider from "@/utils/SessionProvider";
import "@mdxeditor/editor/style.css";
import { getServerSession } from "next-auth";
import TanstackProvider from "@/providers/TanstackProvider";

export const metadata: Metadata = {
  title: "Sample blog next js",
  description: "Sample blog next js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <TanstackProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
