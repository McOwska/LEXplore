# Main features
1. Loading own chapter of a book / other text
    - [ ] consider what format would be the best -> epub? / mobi?
    - [ ] consider max length of the text -> is it needed to ensure smooth work of the app? maybe the whole book could be kept somewhere, and only the current chapter would be loaded for reading?

2. Reading the book
    - [ ] scrolling vs changing pages
    - [ ] displaying the text -> probably should be rather straightfor
    - [ ] after clicking a word with the right key (?) a translation of the SINGLE word should be displayed, after clicking with the left key, translation of the whole sentence should be displayed
    - [ ] scrolling percentage / current place should be somehow stored, so the book should open in the place where the user finished reader last time

# Technicals
1. Sentences translation
    - [ ] AI model - MarianMTModel
2. Words translation
    - [ ] simple swedish - english dictionary stored as a JSON
3. API endpoints
    - [ ] loading the book / chapter (?) - not sure if this should be done via backend
    - [ ] GET - translate sentence
        - body: Sentence in swedish (as a string)
        - response: Sentence in english (as a string)
    - [ ] GET - translate word
        - body: Swedish word
        - response: Word in english. If no word was found in the dictionary, then should return the 'not found' (maybe in the feature fetching additional translations from the web could be implemented)
    - [ ] POST - set position (should be used when leaving the app to save the users position / or maybe for example every minute or sth)
        - body: current user position
    - [ ] GET - current position (should be called each time when opening the app to open the book in a right place)
        - response: current user position

# Ideas for the future
- glossary for "favourite" words
- detecting the most problematic words and saving them in a separate glossary
- reading the words/sentences in swedish - together with a word/sentence translation