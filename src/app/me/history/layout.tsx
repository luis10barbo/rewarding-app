import { HistoryProvider } from "@/context/HistoryContext";

export default function RewardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HistoryProvider>{children}</HistoryProvider>;
}
