"use client";

import { SanityApp } from "@sanity/sdk-react";
import { dataset, projectId } from "@/sanity/env";

/**
 * Admin folosește App SDK: pe localhost nu există sesiune din Sanity Dashboard (iframe).
 * - Implicit: `studioMode` — autentificare din sesiunea de la `/studio` (deschide Studio, loghează-te, apoi `/admin`).
 * - Opțional: `NEXT_PUBLIC_SANITY_ADMIN_SDK_TOKEN` — token Editor din sanity.io/manage (doar dev; nu comita și nu folosi în producție cu drepturi largi).
 */
function SanityAppProvider({ children }: { children: React.ReactNode }) {
  const devToken = process.env.NEXT_PUBLIC_SANITY_ADMIN_SDK_TOKEN?.trim();

  const sanityConfig = devToken
    ? { projectId, dataset, auth: { token: devToken } as const }
    : { projectId, dataset, studioMode: { enabled: true } as const };

  return (
    <SanityApp
      config={[sanityConfig]}
      // We handle the loading state in the Providers component by showing a loading indicator via the dynamic import
      fallback={<div />}
    >
      {children}
    </SanityApp>
  );
}

export default SanityAppProvider;
