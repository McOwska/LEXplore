# source venv/bin/activate
# flask run --host 0.0.0.0 --port 8000 --debugger

from flask import Flask, request, jsonify
from flask_cors import CORS
from translator import translator

app = Flask(__name__)
CORS(app, origins="*", methods=["GET", "POST", "OPTIONS", "PATCH"], allow_headers="*") 

@app.route("/")
def index():
    return "Health Check: LExplore Backend is running!"

@app.route("/translate-word", methods=["POST"])
def translate_word():
    data = request.get_json()
    word = data.get("payload", "")
    translated = translator.translate_word(word)

    return jsonify({"translation": translated})

@app.route("/translate-sentence", methods=["POST"])
def translate_sentence():
    data = request.get_json()
    sentence = data.get("payload", "")
    translated = translator.translate_sentence(sentence)

    return jsonify({"translation": translated})

@app.route("/change-language", methods=["PATCH"])
def change_language():
    data = request.get_json()
    language_code = data.get("language_code", "")
    try:
        translator.change_language(language_code)
    except:
        return jsonify({"status": "error", "message": "Unsupported language"}), 400

    return jsonify({"status": "success", "language_code": language_code}), 200 

if __name__ == "__main__":
    print('Starting LExplore Backend...')
    app.run(host="0.0.0.0", port=8000, debug=True)
