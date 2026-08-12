import { cityKnowledge } from "../data/cities.js";
import { COLLECTION_NAME, recreateCollection, upsertCities } from "../lib/qdrant.js";

async function main() {
  console.log(`準備建立 collection: ${COLLECTION_NAME}`);
  await recreateCollection();

  console.log(`準備寫入 ${cityKnowledge.length} 筆城市知識`);
  await upsertCities(cityKnowledge);

  console.log("知識庫初始化完成。");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
