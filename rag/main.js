import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import dotenv from "dotenv";
import { Pinecone } from '@pinecone-database/pinecone'

dotenv.config();


const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.Index("rag");

const loader = new PDFLoader("./story.pdf");

const docs = await loader.load();

const embedding = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed",
});

/* const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});

const chunks = await splitter.splitDocuments(docs);

const data = await Promise.all(chunks.map(async (chunk) => {
    const embeddingResult = await embedding.embedDocuments([chunk.pageContent]);
    return {
        content: chunk.pageContent,
        embedding: embeddingResult[0],
    };
})); */

/* const vectors = data.map((item, idx) => ({
  id: `chunk-${idx}`,
  values: item.embedding,
  metadata: {
    content: item.content,
  },
}));

const result = await index.upsert(vectors);

console.log("✅ Upsert success:", result); */

const queryEmbedding = await embedding.embedQuery('How was the internship experience?');

console.log(queryEmbedding)

const result = await index.query({
    vector: queryEmbedding,
    topK: 2,
    includeMetadata: true,
})

console.log(JSON.stringify(result))