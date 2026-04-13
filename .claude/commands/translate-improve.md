alsReview and improve Armenian text in the project using the RAFT (Review Armenian, Fix, Test) process.

If an argument is provided (e.g. `/translate-improve 7`), focus the review on the product with that ID from `js/data.js` — review its Armenian `shortDesc`, `fullDesc`, `name`, and any related Instagram caption in `instagram/` folder.

If no argument is provided, run a full review across all Armenian text files.

## Steps

1. Read `js/data.js` to get the product data
2. If a product ID is specified:
   - Extract the Armenian text fields (`name`, `shortDesc`, `fullDesc`) for that product
   - Check for matching Instagram caption files in `instagram/` folder
   - Review the Armenian text for: spelling, grammar, natural phrasing, Eastern Armenian correctness, punctuation (vertsaket), mixed script issues
   - Suggest improvements and apply fixes if confirmed
3. If no product ID:
   - Run `./scripts/raft-armenian.sh` for a full project review
4. Show the issues found and proposed fixes
5. Apply fixes after user confirmation

## Armenian Review Rules

- Eastern Armenian (spoken in Republic of Armenia) is the standard
- Check spelling, grammar, verb forms, case endings
- Ensure natural phrasing (not machine-translated sounding)
- Armenian uses vertsaket (։) not periods for sentence endings
- Product names can be creative — only flag if clearly wrong
- "Պապյե մաdelays" transliteration is acceptable
- Preserve English translations as-is
- Keep prices in AMD format as-is
