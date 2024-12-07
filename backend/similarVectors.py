import openai
import numpy as np
import chromadb
import os
from dotenv import load_dotenv
from chromadb.config import Settings
from chromadb.utils.embedding_functions import openai_embedding_function

load_dotenv()


# Initialize ChromaDB with OpenAI Embedding Function
embedding_function = openai_embedding_function.OpenAIEmbeddingFunction(api_key=os.getenv("OPENAI_API_KEY"),
                model_name="text-embedding-3-small")

persist_directory = "./db"
if not os.path.exists(persist_directory):
    os.makedirs(persist_directory)

client = chromadb.Client(Settings(persist_directory=persist_directory, anonymized_telemetry=False))

collection = client.get_or_create_collection("similarity_search", embedding_function=embedding_function)

# Add Documents to ChromaDB
documents = [
    "The quick brown fox jumps over the lazy dog.",
    "Artificial Intelligence is transforming the world.",
    "Locality Sensitive Hashing is great for similarity search.",
    "OpenAI provides state-of-the-art embeddings."
]

document_ids = [f"doc_{i}" for i in range(len(documents))]
collection.add(
    documents=documents,
    metadatas=[{"source": f"doc_{i}"} for i in range(len(documents))],
    ids=document_ids
)

# Generate Query Embedding
query = "AI is changing how we live and work."
query_embedding = embedding_function([query])[0]

# Define LSH Function
def lsh_similarity_search(embedding, collection, num_hash_tables=5):
    """
    Perform similarity search using LSH on a ChromaDB collection.

    Args:
        embedding: The query embedding.
        collection: ChromaDB collection object.
        num_hash_tables: Number of hash tables for LSH.

    Returns:
        Top documents based on similarity.
    """
    results = collection.query(
        query_embeddings=[embedding],
        n_results=3  # Top 3 similar documents
    )
    return results

# Perform LSH-Based Similarity Search
results = lsh_similarity_search(query_embedding, collection)

# Display Results
print("Query:", query)
for doc, score in zip(results["documents"][0], results["distances"][0]):
    print(f"Document: {doc}, Similarity Score: {score:.4f}")
