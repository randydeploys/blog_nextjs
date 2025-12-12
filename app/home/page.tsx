// homepage

import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This is a basic Next.js page component.</p>
      <Link href="/">Retour à l'accueil</Link>
    </div>
  );
}

