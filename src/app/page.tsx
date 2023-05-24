"use client";

import Home from "@/components/pages/Home";
import { UserProvider } from "@/context/UserContext";

export default function HomePage() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}
