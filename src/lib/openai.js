import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config.js";

export const client = new OpenAI({ apiKey: OPENAI_API_KEY });
export const EMBEDDING_MODEL = "text-embedding-3-small";
export const EMBEDDING_DIM = 1536;
