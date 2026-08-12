# 作業 3：建立迷你知識庫

主題：台灣城市介紹

本作業參考課程 3.1 Embeddings 與 3.2 Qdrant 向量搜尋範例，建立一個包含 5 筆台灣城市資料的迷你知識庫，並用向量相似度搜尋驗證查詢結果。

## 實作內容

- `src/data/cities.js`：5 筆城市知識內容
- `src/lib/openai.js`：OpenAI client 與 Embedding model 設定
- `src/lib/qdrant.js`：Qdrant client、collection 建立、embedding、upsert、search
- `src/scripts/init-knowledge-base.js`：初始化知識庫並寫入向量資料庫
- `src/scripts/search-test.js`：用 3 種不同問法測試搜尋結果
- `src/main.js`：互動式搜尋程式

## 執行方式

先安裝套件：

```bash
npm install
```

建立 `.env`：

```bash
OPENAI_API_KEY=你的 OpenAI API Key
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=
```

若使用本機 Qdrant，可先啟動 Docker：

```bash
docker run -p 6333:6333 qdrant/qdrant
```

初始化知識庫：

```bash
npm run init
```

執行 3 組搜尋測試：

```bash
npm test
```

互動式搜尋：

```bash
npm run search
```

輸入 `exit` 可結束。

## 測試查詢與預期結果

以下為搜尋測試設計，實際分數會依 Embeddings API 與資料庫狀態略有差異。

1. 查詢：`哪個城市適合看歷史古蹟和吃小吃？`
   - 預期：台南市排名靠前，因為資料包含古都、古蹟、牛肉湯、虱目魚等內容。

2. 查詢：`我想找高科技產業和風很大的地方`
   - 預期：新竹市排名靠前，因為資料包含科學園區、半導體、高科技產業與九降風。

3. 查詢：`哪裡有港口、捷運和南部城市生活？`
   - 預期：高雄市排名靠前，因為資料包含港都、捷運、亞洲新灣區與南台灣生活。

## 實際搜尋結果

目前本機尚未建立 `.env`，因此尚未呼叫 Embeddings API 產生實際相似度分數。請在設定 API Key 並啟動 Qdrant 後執行：

```bash
npm run init
npm test
```

將終端機輸出的 3 組查詢結果與相似度分數貼到此區，即符合繳交要求。

### 查詢 1

待執行後填入。

### 查詢 2

待執行後填入。

### 查詢 3

待執行後填入。
