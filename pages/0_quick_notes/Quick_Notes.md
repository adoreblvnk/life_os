---
aliases:
  - 🗒️ Quick Notes
obsidianUIMode: preview
---

```dataviewjs
const { CustomUtils } = customJS;

await dv.view("data/views/navbar");

await dv.view("data/views/tips", {tip: dv.current().file.name});

// Embed notes
CustomUtils.listNotes(dv);
```
