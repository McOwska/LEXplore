from transformers import MarianMTModel, MarianTokenizer
import json, pathlib, gzip

def translate_sentence(tokenizer, model, src_sentence):
    inputs = tokenizer(src_sentence, return_tensors="pt", padding=True)
    translated = model.generate(**inputs)
    tgt_sentence = [tokenizer.decode(t, skip_special_tokens=True) for t in translated]
    return tgt_sentence


# Specify the model name
model_name = "Helsinki-NLP/opus-mt-sv-en"

# Load the tokenizer and model
tokenizer = MarianTokenizer.from_pretrained(model_name)
model = MarianMTModel.from_pretrained(model_name)

# Define the source text
src_text = ["Mr och mrs Dursley i nummer fyra på Privet Drive var med rätta stolta över att säga att de var helt normala."]

translated_sentence = translate_sentence(tokenizer, model, src_text)

print('Full sentence - translated', translated_sentence)

data = json.loads(pathlib.Path("dict/sv_en_plain.json").read_text())
print('Single translated word:', data["nummer"])