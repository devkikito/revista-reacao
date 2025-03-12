"use server";
import React from "react";
import defaultMetatada from "@/metadata/defaultMetadata";
import { Metadata } from "next";
import { VagasEmpregoPage } from "@/components/pages/vagasEmprego";

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetatada();
}

export default async function VagasEmprego() {
  return <VagasEmpregoPage />;
}
