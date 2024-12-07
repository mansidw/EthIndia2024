import json
from flask import Flask, request
from flask_cors import CORS
from langchain_unstructured import UnstructuredLoader
app = Flask(__name__)
cors = CORS(app)

@app.route("/health", methods=["GET"])
def health():
    return {"data": "All OK"}

@app.route("/populate-links", methods=["POST"])
async def populate_links():
    request_data = request.get_json()
    links = request_data.get("links",[])

    final_arr = []

    for i in links:
        loader = UnstructuredLoader(web_url=i)
        docs = []
        final_resp={}
        async for doc in loader.alazy_load():
            docs.append(doc.page_content)
        final_resp["content"] = "\n".join(docs)
        final_resp["url"] = i
        final_arr.append(final_resp)
    return {"data": final_arr}



if __name__ == "__main__":
    app.run(debug=True)