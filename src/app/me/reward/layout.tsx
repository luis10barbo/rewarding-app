import { RewardProvider } from "@/context/RewardContext";

export default function RewardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RewardProvider>{children}</RewardProvider>;
}
