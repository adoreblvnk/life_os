/**
 * Configs used primarily by CustomUtils
 */
class Config {
  /**
   * List of ordered dashboard pages
   * @type {Array.<string>}
   */
  dashboards = [
    "Life_OS",
    "Quick_Notes",
    "Journal",
    "Tasks",
    "Life_Stages",
    "Projects",
    "Learning",
    "Writings",
  ];

  /**
   * Dashboard to folder path binding
   * @type {Object.<string, string>}
   */
  folders = {
    Quick_Notes: '"2_primary/quick_notes"',
    Journal: '"1_journal"',
    Tasks: '"2_primary/tasks"',
    Life_Stages: '"2_primary/life_stages"',
    Projects: '"3_collections/projects"',
    Learning: '"3_collections/learning"',
    Writings: '"3_collections/writings"',
  };

  /**
   * Folder path to dashboard binding
   * @type {Object.<string, string>}
   * @see {@link folders}
   */
  invertFolders = Object.fromEntries(
    Object.entries(this.folders).map(([key, val]) => [val, key])
  );

  /**
   * Page status to header text binding
   * @type {Object.<string, string>}
   */
  pageStatus = {
    backlog: "🗃️ Backlog",
    "in-progress": "▶️ In Progress",
    completed: "✅ Done",
    cancelled: "❌ Cancelled",
    future: "🔮 Future",
  };

  /**
   * For each page type, list all task statuses with their header text &
   * Dataview query
   * @type {Object.<string, Object.<string, Object.<string, string>>>}
   */
  pageTaskStatuses = {
    ToDo: {
      header: "🔄 To Do",
      query: "t => !t.checked",
    },
    Tasks: {
      inProgress: {
        header: "▶️ In Progress",
        query: "t => !t.checked",
      },
      completed: {
        header: "✅ Done",
        query: "t => t.fullyCompleted",
      },
    },
    Life_Stages: {
      backlog: {
        header: "🗃️ Backlog",
        query: "t => !t.text.includes('🛫') && !t.checked",
      },
      inProgress: {
        header: "▶️ In Progress",
        query: "t => t.text.includes('🛫') && !t.checked",
      },
      completed: {
        header: "✅ Done",
        query: "t => t.fullyCompleted",
      },
      cancelled: {
        header: "❌ Cancelled",
        query: "t => t.status == '-'",
      },
    },
    Projects: {
      backlog: {
        header: "🗃️ Backlog",
        query: "t => !t.text.includes('🛫') && !t.checked",
      },
      inProgress: {
        header: "▶️ In Progress",
        query: "t => t.text.includes('🛫') && !t.checked",
      },
      completed: {
        header: "✅ Done",
        query: "t => t.fullyCompleted",
      },
      cancelled: {
        header: "❌ Cancelled",
        query: "t => t.status == '-'",
      },
    },
    Learning: {
      backlog: {
        header: "🗃️ Backlog",
        query: "t => !t.text.includes('🛫') && !t.checked",
      },
      inProgress: {
        header: "▶️ In Progress",
        query: "t => t.text.includes('🛫') && !t.checked",
      },
      completed: {
        header: "✅ Done",
        query: "t => t.fullyCompleted",
      },
    },
  };
}
