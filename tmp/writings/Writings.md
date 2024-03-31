---
aliases: ✒️ Writings
---

```dataviewjs
const { CustomUtils } = customJS;
CustomUtils.navbarMain(dv);
```

<!-- Writings: Longform content. -->

## 💬 Rants

### ▶️ In Progress

```dataview
LIST
FROM "tmp/writings"
WHERE file.name != "Writings" AND lower(status) = "in-progress"
SORT file.mtime DESC
```
### ✅ Completed

```dataview
LIST
FROM "tmp/writings"
WHERE file.name != "Writings" AND lower(status) = "completed"
SORT file.mtime DESC
```
