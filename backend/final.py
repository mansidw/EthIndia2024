import os
from chromadb.utils.embedding_functions.openai_embedding_function import OpenAIEmbeddingFunction
from langchain.vectorstores import Chroma
from dotenv import load_dotenv
from langchain.schema import Document

load_dotenv()

def create_collection_local(client, collection_name, embedding_function):
    collection = client.create_collection(
        name=collection_name, embedding_function=embedding_function
    )
    return collection


def add_documents_local(collection, document, id):
    collection.add_documents(documents=document, ids=id)
    collection.persist()


def query_documents_local(collection, question):
    results = collection.similarity_search_with_score(query=question, k=2)
    return results


embedding_function = OpenAIEmbeddingFunction(api_key=os.getenv("OPENAI_API_KEY"),
                model_name="text-embedding-3-small")
# BAAI/bge-large-en-v1.5

documents = [
    "The quick brown fox jumps over the lazy dog.",
    "Artificial Intelligence is transforming the world.",
    "Locality Sensitive Hashing is great for similarity search.",
    "OpenAI provides state-of-the-art embeddings."
]

doc_Documents = []

for i in documents:
    # metadata = {"author": "OpenAI", "category": "Technology"}
    # Convert string to Document
    doc = Document(page_content=i)
    doc_Documents.append(doc)


persist_directory = "./db"
if not os.path.exists(persist_directory):
    os.makedirs(persist_directory)

collection = Chroma(
    collection_name="news_data",
    embedding_function=embedding_function,
    persist_directory=persist_directory,
)

def split_documents(documents, chunk_size=166):
    return [documents[i : i + chunk_size] for i in range(0, len(documents), chunk_size)]


split_docs = split_documents(doc_Documents)
for i, chunk in enumerate(split_docs):
    start_index = sum(len(split_docs[j]) for j in range(i))
    indices = list(range(start_index, start_index + len(chunk)))
    indices_str = list(map(str, indices))

    add_documents_local(collection, chunk, list(indices_str))


# query = "give some course details about AWS Elastic beanstalk?"
query = "AI is changing how we live and work."
print(query_documents_local(collection, query))