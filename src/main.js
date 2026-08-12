import { input } from "@inquirer/prompts";
import { searchCities } from "./lib/qdrant.js";
import { spinner } from "./utils/spinner.js";

try {
  while (true) {
    const query = (await input({ message: "請輸入想查詢的城市特色：" })).trim();

    if (!query) continue;
    if (query.toLowerCase() === "exit") {
      console.log("再會。");
      break;
    }

    const spin = spinner("搜尋知識庫中...").start();
    const results = await searchCities(query, 3);
    spin.stop();

    for (const [index, result] of results.entries()) {
      console.log(`\n${index + 1}. ${result.city} (${result.region})`);
      console.log(`   相似度：${result.score.toFixed(4)}`);
      console.log(`   ${result.content}`);
    }
    console.log();
  }
} catch (err) {
  if (err.name === "ExitPromptError") {
    console.log("\n再會。");
  } else {
    throw err;
  }
}
