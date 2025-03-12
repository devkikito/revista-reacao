"use server";
import React from "react";
import defaultMetatada from "@/metadata/defaultMetadata";
import { Metadata } from "next";
import NewsByCategoryPage from "@/components/pages/newsByCategory";

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetatada();
}

export default async function page({ params }: Readonly<{ params: { category: string } }>) {
  return <NewsByCategoryPage category={params.category} />;
}
