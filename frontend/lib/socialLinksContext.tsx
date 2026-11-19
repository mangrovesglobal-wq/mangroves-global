"use client";

import { createContext, useContext } from "react";

export type SocialLinks = {
  facebook_url?: string | null;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  twitter_url?: string | null;
  youtube_url?: string | null;
  whatsapp_number?: string | null;
};

const SocialLinksContext = createContext<SocialLinks>({});

export function SocialLinksProvider({
  links,
  children,
}: {
  links: SocialLinks;
  children: React.ReactNode;
}) {
  return (
    <SocialLinksContext.Provider value={links}>
      {children}
    </SocialLinksContext.Provider>
  );
}

export function useSocialLinks(): SocialLinks {
  return useContext(SocialLinksContext);
}
