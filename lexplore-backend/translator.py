from transformers import MarianMTModel, MarianTokenizer
import json, pathlib, gzip, torch

class Translator:
    def __init__(self, language_code="sv"):
        self._load_model_and_dict(language_code)

    def _load_model_and_dict(self, language_code):
        languages_map = json.loads(pathlib.Path('./languages_map.json').read_text())
        model_name = languages_map[language_code]["model"]
        dict_path = 'dict/' + languages_map[language_code]["dict"]

        self.tokenizer = MarianTokenizer.from_pretrained(model_name)
        self.model = MarianMTModel.from_pretrained(model_name)
        self.dictionary = json.loads(pathlib.Path(dict_path).read_text())
    
    def translate_sentence(self, input_sentence):
        inputs = self.tokenizer(input_sentence, return_tensors="pt", padding=True, truncation=True)
        inputs = {k: v.to(self.model.device) for k, v in inputs.items()}

        with torch.inference_mode():
            outputs = self.model.generate(**inputs)

        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    def translate_word(self, input_word):
        try:
            translated = self.dictionary[input_word]
        except:
            translated = self.translate_sentence(input_word)
        return translated

    def change_language(self, language_code):
        self._load_model_and_dict(language_code)
    
translator = Translator("swc")