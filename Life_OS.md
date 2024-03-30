---
obsidianUIMode: preview
---

```dataview
CALENDAR file.ctime
```

**[[Life_OS|Life OS]]** | [[Life_OS#/boot|/boot]] | [[Life_OS#/home|/home]] | [[Life_OS#/bin|/bin]] | [[Life_OS#/tmp|/tmp]]

# /boot

<!-- /boot: What you see when Life OS is first loaded. Keep this short & sweet. -->

```dataviewjs
const { CustomUtils } = customJS;

// order of folder matters & determines order where items in folders are
// rendered.
const folders = [
  '"home/journal"',
  '"home/tasks"',
  '"home/life_stages"',
  '"bin/projects"',
  '"bin/learning"',
];

// task dashboard.
// each category is ordered by importance and does not show tasks shown in the
// previous category.

// uncompleted tasks with high priority
dv.header(2, "⏫ High Priority");
CustomUtils.taskRenderPerFolder(
  dv,
  folders,
  "t => !t.completed && t.text.includes('⏫')"
);

// tasks due today or overdue. does not show tasks shown before
dv.header(2, "🔴 Due Today / Overdue");
CustomUtils.taskRenderPerFolder(
  dv,
  folders,
  "t => !t.completed && !t.text.includes('⏫') && t.due <= moment()"
);

// tasks due this week (today + 7 days). does not show tasks shown before
dv.header(2, "🟠 Due This Week");
CustomUtils.taskRenderPerFolder(
  dv,
  folders,
  `t => !t.completed && !t.text.includes("⏫") && moment() <= t.due
  && t.due <= moment().add(7, "d")`
);

// other tasks
dv.header(2, "🟢 Other Tasks");
CustomUtils.taskRenderPerFolder(
  dv,
  folders,
  `t => !t.completed && !t.text.includes('⏫') && t.text
  && (!t.due || t.due > moment().add(7, "d"))`
);
```

![[Quick_Notes#🗒️ Quick Notes]]

# /home

<!-- /home: Personal items. -->

## [[Journal|📓 Journal]]

## [[Life_Stages|⏳ Life Stages]]

## [[Tasks|📝 Tasks]]
  
# /bin

<!-- /bin: Projects are like binaries that get executed by the user. May not always be active, hence its separate category. -->

## [[Projects|📽️ Projects]]

## [[Learning|🎓 Learning]]

# /tmp

<!-- /tmp: Optional files that can be deleted if unnecessary. -->

## [[Vision_Board|💜 Vision Board]]

## [[Writings|✒️ Writings]]

## 🔗 Links

- Twitter: [adore_blvnk](https://twitter.com/adore_blvnk)
- GitHub: [adoreblvnk](https://github.com/adoreblvnk)
