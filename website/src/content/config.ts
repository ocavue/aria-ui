import { docsSchema } from "@astrojs/starlight/schema"
import { defineCollection, type SchemaContext } from "astro:content"

type DocsSchema = ReturnType<ReturnType<typeof docsSchema>>
const schema: (context: SchemaContext) => DocsSchema = docsSchema()

type CollectionConfig = ReturnType<typeof defineCollection<DocsSchema>>
const docs: CollectionConfig = defineCollection<DocsSchema>({ schema })

export const collections: { docs: CollectionConfig } = { docs }
