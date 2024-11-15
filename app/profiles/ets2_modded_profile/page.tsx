'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Open the external link in a new tab
    window.open('https://modsfire.com/x45EhSV5aqLn895', '_blank');
    // Optionally redirect to a different page in your app after opening the new tab
    router.push('/');
  }, [router]);

  return null;
}
