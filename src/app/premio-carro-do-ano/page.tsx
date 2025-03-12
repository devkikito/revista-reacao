"use server";

import { PremioDoAnoPage } from "@/components/pages/PremioDoAno";
import defaultMetatada from "@/metadata/defaultMetadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetatada();
}

export default async function PremioDoAno() {
  return <PremioDoAnoPage />;
}
