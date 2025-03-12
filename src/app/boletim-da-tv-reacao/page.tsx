"use server";
import React from "react";
import defaultMetatada from "@/metadata/defaultMetadata";
import BoletimPage from "@/components/pages/boletim";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetatada();
}

export default async function page() {
  return <BoletimPage />;
}
