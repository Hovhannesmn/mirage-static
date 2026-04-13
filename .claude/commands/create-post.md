Create an Instagram post folder for a product. Argument is a keyword matching the product name or its image folder name in `js/data.js`.

Example: `/create-post squirrel` creates a post for the squirrel product, `/create-post elephant` for the elephant, etc.

## Steps

1. Read `js/data.js` and find the product by matching the argument against:
   - The image folder path (e.g. `images/mirage/squirrel/` matches "squirrel")
   - The English part of `fullDesc`
   - The product `name` or `tag`
2. If no match or no argument provided, list available products and ask which one
3. Create the post folder at `instagram/post-{id}-{slug}/` where slug is the keyword argument (e.g. `post-4-elephant`)
4. Generate `caption.txt` following this exact format:

```
{name} · {price} {emoji}

{Armenian fullDesc paragraph}

{English fullDesc paragraph}

✨ Ձեռագործ · Եզակի · Հայկական
🎁 Հիանալի նվdelays բdelays համdelays

📲 Պdelays WhatsApp- delays՝ +374 93 511288
🌐 https://miragehandmade.com/product.html?id={id}

#MirageHandmade #HandmadeArmenia #PapierMache #ArmenianCraft #UniqueGift #HandmadeArt #Armenia #GiftIdeas #HandmadeWithLove
```

5. Copy product images from the product's `images` array into the post folder (e.g. `images/mirage/elephant/1.jpg` -> `instagram/post-4-elephant/1.jpg`)
6. If the product has a video file, copy it too
7. Show what was created and the caption content

## Rules

- Use the product data exactly from `js/data.js` — `name`, `price`, `shortDesc`, `fullDesc`, `images`, `video`
- The `fullDesc` has Armenian and English paragraphs separated by `\n\n` — use both in the caption
- Pick an appropriate emoji for the title line based on the product
- Product link must use the correct product ID: `https://miragehandmade.com/product.html?id={id}`
- Copy actual image/video files, don't just reference them
- Keep folder naming consistent: `post-{id}-{slug}`
