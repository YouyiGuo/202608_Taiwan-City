import { QdrantClient } from "@qdrant/js-client-rest";
import { QDRANT_API_KEY, QDRANT_URL } from "../config.js";
import { cityToSearchText } from "../data/cities.js";
import { client, EMBEDDING_DIM, EMBEDDING_MODEL } from "./openai.js";

export const COLLECTION_NAME = "homework3_taiwan_cities";

export const qdrant = new QdrantClient({
  url: QDRANT_URL,
  ...(QDRANT_API_KEY && { apiKey: QDRANT_API_KEY }),
  checkCompatibility: false,
});

export async function embed(input) {
  const res = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input,
  });
  return res.data.map((item) => item.embedding);
}

export async function recreateCollection() {
  const exists = await qdrant.collectionExists(COLLECTION_NAME);
  if (exists.exists) {
    await qdrant.deleteCollection(COLLECTION_NAME);
  }

  await qdrant.createCollection(COLLECTION_NAME, {
    vectors: {
      size: EMBEDDING_DIM,
      distance: "Cosine",
    },
  });
}

export async function upsertCities(cities) {
  const texts = cities.map(cityToSearchText);
  const vectors = await embed(texts);

  const points = cities.map((city, index) => ({
    id: city.id,
    vector: vectors[index],
    payload: {
      city: city.city,
      region: city.region,
      content: city.content,
    },
  }));

  await qdrant.upsert(COLLECTION_NAME, { wait: true, points });
}

export async function searchCities(query, limit = 3) {
  const [vector] = await embed(query);

  const results = await qdrant.search(COLLECTION_NAME, {
    vector,
    limit,
    with_payload: true,
  });

  return results.map((result) => ({
    score: result.score,
    city: result.payload.city,
    region: result.payload.region,
    content: result.payload.content,
  }));
}
