# Wordle Unlimited

Wordle without the daily limit!

## Features

- 1000+ words
  - Words are curated from https://eslforums.com/5-letter-words/
  - Most plurals that end in `s` have been removed for now
  - Many adverbs and non-present verb tenses have been removed
  - Obscure words (wtf is an amnio?) have been removed

## Dev Notes

- Need to implement browser caching
    - Keep track of play history
    - Can refresh and maintain state (need state manager?)
- Implement hint system
    - Show letter that is included (maybe show in yellow in keyboard)
    - Gray out letter that's not included on keyboard
- Detect user keyboard so you don't have to click on the keyboard like a scrub
- Implement skip word feature
    - Need to also be able to go back to previous words
    - Maybe also reset for previously solved words?
- Implement multiple game modes?
    - 4 letter words with 5 guesses 
    - 6 letter words with 5 guesses
    - Curating a good list is a bitch though
- Leaderboard?
