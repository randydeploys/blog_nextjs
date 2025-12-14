"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function UserGreeting() {
  const auth = authClient.useSession();

  if (!auth?.data?.user) {
    return null;
  }

  return (
    <p className="text-lg text-center mb-6 text-gray-700">
      Hello {auth.data.user.name}!{" "}
      <Button className="ml-2" onClick={() => authClient.signOut()}>
        Sign out
      </Button>
    </p>
  );
}
