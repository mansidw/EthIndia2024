import os
import chromadb
from chromadb.config import Settings
# from sentence_transformers import SentenceTransformer
from chromadb.utils.embedding_functions import openai_embedding_function
import numpy as np
from dotenv import load_dotenv
from sklearn.utils import murmurhash3_32

load_dotenv()
# Initialize ChromaDB
chroma_client = chromadb.Client(Settings(
    persist_directory="news_articles_db",  # Directory to store vector DB
))

# Create a collection in ChromaDB
collection_name = "news_articles"
if collection_name not in chroma_client.list_collections():
    collection = chroma_client.create_collection(name=collection_name)
else:
    collection = chroma_client.get_collection(name=collection_name)

# Load Sentence Transformer Model
# model = SentenceTransformer('all-MiniLM-L6-v2')
model = openai_embedding_function.OpenAIEmbeddingFunction(
                api_key=os.getenv("OPENAI_API_KEY"),
                model_name="text-embedding-3-small"
            )

# Define LSH Parameters
NUM_HASHES = 5  # Number of hash functions
BIT_SIZE = 32   # Size of each hash

# LSH Function: Generate multiple hashes for a single vector
def lsh_hash(vector, num_hashes=NUM_HASHES, bit_size=BIT_SIZE):
    """
    Hashes a vector into `num_hashes` buckets using murmurhash.
    """
    return [murmurhash3_32(str(vector), seed=i) % (2 ** bit_size) for i in range(num_hashes)]

# Sample News Articles
articles = [
    "Breaking news: The stock market saw a significant dip today.",
    "Tech giants report quarterly earnings, showing mixed results.",
    "Breaking news: Stock markets experience turbulence amid economic uncertainty.",
    "New innovations in AI are set to transform industries.",
    "Sports update: The local team wins the championship!"
]

# Add articles to ChromaDB with LSH hashes
for i, article in enumerate(articles):
    # Compute embedding
    embeddings = model(article)
    print(type(embeddings))
    # Generate LSH hashes for the embeddings
    hashes = lsh_hash(embeddings)

    flattened_embeddings = [
        embedding.tolist() if isinstance(embedding, np.ndarray) else embedding
        for sublist in embeddings for embedding in sublist
    ]
    
    # Store in ChromaDB
    collection.add(
        ids=[f"article_{i}"],
        embeddings=[flattened_embeddings],
        metadatas=[{"text": article, "hashes": hashes}]
    )

print("Articles added to ChromaDB.")

# Query a new article for similarity
new_article = "Stock markets crash amid investor fears of recession."
new_embedding = model(new_article)
new_hashes = lsh_hash(new_embedding)

# Fetch all articles in ChromaDB and compare LSH hashes
results = collection.get(include=["metadatas", "embeddings"])
similar_articles = []

for metadata in results["metadatas"]:
    existing_hashes = metadata["hashes"]
    
    # Compare hashes using Hamming similarity
    matching_hashes = sum(1 for h1, h2 in zip(existing_hashes, new_hashes) if h1 == h2)
    similarity_score = matching_hashes / NUM_HASHES  # Normalize to [0, 1]
    
    if similarity_score >= 0.8:  # Threshold for similarity
        similar_articles.append(metadata["text"])

print(f"New Article: {new_article}")
print(f"Similar Articles (>=80% match):")
for article in similar_articles:
    print(f"- {article}")
