---
# status: Either "backlog, in-progress, completed, cancelled". Case insensitive.
status: backlog
---

[[Life_OS|Life OS]] > [[Life_OS#/bin|/bin]] > [[Projects]]

## 📄 Description

<% tp.file.cursor() %>

**⏳ Timebox**: 

### 🔗 Links

- 

---

## 📝 Project Tasks

```dataviewjs
const { CustomUtils } = customJS;

dv.header(3, "🗃️ Backlog");
CustomUtils.taskRenderCurrent(
  dv,
  "t => t.text && !t.text.includes('🛫') && !t.completed"
);
dv.header(3, "▶️ In Progress");
CustomUtils.taskRenderCurrent(
  dv,
  "t => t.text.includes('🛫') && !t.completed && !t.checked"
);
dv.header(3, "✅ Done");
CustomUtils.taskRenderCurrent(dv, "t => t.text && t.completed");
dv.header(3, "❌ Cancelled");
CustomUtils.taskRenderCurrent(dv, "t => t.text && !t.completed && t.checked");
```

---

## 🪵 Resources

- 

## 📦 Idea Box

- 

#### Tasks

<!-- Tasks: Add all tasks here. Task uses emojis as labels.
- [ ] <task> [⏫] [🛫] [📅 <date>] 
⏫: High priority
🛫: Started 
📅: Due date -->

- [ ] 

> [[#📝 Project Tasks|Back to Project Tasks]]
