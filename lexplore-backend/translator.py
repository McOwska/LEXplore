from transformers import MarianMTModel, MarianTokenizer
import json, pathlib, torch, gc

class Translator:
    def __init__(self, language_code="sv"):
        if torch.backends.mps.is_available():
            self.device = torch.device("mps")
        elif torch.cuda.is_available():
            self.device = torch.device("cuda")
        else:
            self.device = torch.device("cpu")
        self._load_model_and_dict(language_code)

    def _load_model_and_dict(self, language_code: str):
        languages_map = json.loads(pathlib.Path('./languages_map.json').read_text())
        if language_code not in languages_map:
            raise ValueError(f"Unsupported language_code: {language_code}")

        model_name = languages_map[language_code]["model"]
        dict_path = pathlib.Path('dict') / languages_map[language_code]["dict"]

        self.tokenizer = MarianTokenizer.from_pretrained(model_name)

        self.model = MarianMTModel.from_pretrained(
            model_name,
            device_map=None,
            low_cpu_mem_usage=False
        )
        self.model.to(self.device)
        self.model.eval()

        if self.tokenizer.pad_token_id is None and self.tokenizer.eos_token_id is not None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
        self.model.generation_config.pad_token_id = self.tokenizer.pad_token_id
        self.model.generation_config.eos_token_id = self.tokenizer.eos_token_id

        self.dictionary = json.loads(pathlib.Path(dict_path).read_text())

    def translate_sentence(self, input_sentence: str) -> str:
        encoded = self.tokenizer(
            input_sentence,
            return_tensors="pt",
            padding=True,
            truncation=True
        ).to(self.device)

        with torch.inference_mode():
            outputs = self.model.generate(
                **encoded,
                pad_token_id=self.tokenizer.pad_token_id,
                eos_token_id=self.tokenizer.eos_token_id
            )
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)

    def translate_word(self, input_word: str) -> str:
        try:
            return self.dictionary[input_word]
        except KeyError:
            return self.translate_sentence(input_word)

    def change_language(self, language_code: str):
        if hasattr(self, "model") and self.model is not None:
            del self.model
            gc.collect()
            if self.device.type == "mps":
                torch.mps.empty_cache()
            elif self.device.type == "cuda":
                torch.cuda.empty_cache()
        self._load_model_and_dict(language_code)

translator = Translator("swc")
