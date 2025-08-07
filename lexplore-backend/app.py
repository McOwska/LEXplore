# source venv/bin/activate
# flask run --host 0.0.0.0 --port 8000 --debugger

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*", methods=["GET", "POST", "OPTIONS"], allow_headers="*") 

@app.route("/")
def index():
    return "Health Check: LExplore Backend is running!"

@app.route("/translate-word", methods=["POST"])
def translate_word():
    data = request.get_json()
    word = data.get("word", "")
    return jsonify({"translation": word})


@app.route("/translate-sentence", methods=["POST"])
def translate_sentence():
    data = request.get_json()
    sentence = data.get("sentence", "")
    return jsonify({"translation": sentence})


if __name__ == "__main__":
    print('Starting LExplore Backend...')
    app.run(host="0.0.0.0", port=8000, debug=True)
