/**
 * Configs used primarily by CustomUtils
 */
class Config {
  /**
   * List of ordered dashboard pages
   * @type {Array.<string>}
   */
  DASHBOARDS = [
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
  FOLDERS = {
    Quick_Notes: '"pages/0_quick_notes"',
    Journal: '"pages/1_journal"',
    Tasks: '"pages/2_tasks"',
    Life_Stages: '"pages/3_life_stages"',
    Projects: '"pages/4_projects"',
    Learning: '"pages/5_learning"',
    Writings: '"pages/6_writings"',
  };

  /**
   * Folder path to dashboard binding
   * @type {Object.<string, string>}
   * @see {@link FOLDERS}
   */
  INVERT_FOLDERS = Object.fromEntries(
    Object.entries(this.FOLDERS).map(([key, val]) => [val, key])
  );

  
  /**
   * Non-user folders
   * @type {string}
   */
  EXCLUDED_FOLDER = "data/" 

  /**
   * Page status to header text binding
   * @type {Object.<string, string>}
   */
  PAGE_STATUS = {
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
  PAGE_TASK_STATUSES = {
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
