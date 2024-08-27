import { Metadata as NextMetadata } from "next";

interface Metadata {
  title?: string;
  description?: string;
}

export const createTitleMetadata = (title: string): Metadata => ({
  title,
});

export const createDescriptionMetadata = (description: string): Metadata => ({
  description,
});
