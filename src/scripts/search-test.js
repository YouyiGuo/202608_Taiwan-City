import { searchCities } from "../lib/qdrant.js";

const queries = [
  "哪個城市適合看歷史古蹟和吃小吃？",
  "我想找高科技產業和風很大的地方",
  "哪裡有港口、捷運和南部城市生活？",
];

async function main() {
  for (const query of queries) {
    console.log(`\n查詢：${query}`);
    const results = await searchCities(query, 3);

    for (const [index, result] of results.entries()) {
      console.log(
        `${index + 1}. ${result.city} (${result.region}) - 相似度：${result.score.toFixed(4)}`,
      );
      console.log(`   ${result.content}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
