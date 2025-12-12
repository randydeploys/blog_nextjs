
"use client";
import Image from "next/image";
import Link from "next/link";
import prisma from '@/lib/prisma'
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function Home() {
    const auth = authClient.useSession();

  return (
     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Superblog
      </h1>
 

      {/* say hello if auth */}
      {auth?.data?.user && <p>Hello {auth.data.user.name} <Button className="ml-2 " onClick={() => authClient.signOut()}>Sign out</Button></p>}
    </div>
  );
}
