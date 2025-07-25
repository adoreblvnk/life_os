/**
 * Configs used by CustomUtils
 */
class Config {
  /**
   * Dashboard to folder path binding
   * @type {Object.<string, string>}
   */
  DASHBOARDS = Object.freeze({
    Quick_Notes: "pages/0_quick_notes",
    Journal: "pages/1_journal",
    Tasks: "pages/2_tasks",
    Life_Stages: "pages/3_life_stages",
    Projects: "pages/4_projects",
    Learning: "pages/5_learning",
    Writings: "pages/6_writings"
  });

  /**
   * Global folder
   * @type {string}
   */
  GLOBAL_FOLDER = "pages";

  /**
   * Page status to header text binding
   * @type {Object.<string, string>}
   */
  PAGE_STATUS = Object.freeze({
    backlog: "🗃️ Backlog",
    "in-progress": "▶️ In Progress",
    completed: "✅ Done",
    cancelled: "❌ Cancelled",
    future: "🔮 Future",
  });

  /**
   * Individual task status
   * @type {Object.<string, Object.<string, string>>}
   */
  TASK_STATUS = Object.freeze({
    todo: {
      header: "🔄 To Do",
      query: "!t.checked",
    },
    backlog: {
      header: "🗃️ Backlog",
      query: "!t.text.includes('🛫') && !t.checked",
    },
    inProgress: {
      header: "▶️ In Progress",
      query: "t.text.includes('🛫') && !t.checked",
    },
    inProgressNB: {
      header: "▶️ In Progress",
      query: "!t.checked",
    },
    completed: {
      header: "✅ Done",
      query: "t.fullyCompleted",
    },
    cancelled: {
      header: "❌ Cancelled",
      query: "t.status == '-'",
    },
  });

  /**
   * For each page type, list all task statuses with their header text &
   * Dataview query
   * @type {Object.<string, Object.<string, Object<string, string>>>}
   */
  PAGE_TASK_STATUS = Object.freeze({
    Tasks: {
      inProgress: this.TASK_STATUS.inProgressNB,
      backlog: this.TASK_STATUS.backlog,
      completed: this.TASK_STATUS.completed,
    },
    Life_Stages: {
      backlog: this.TASK_STATUS.backlog,
      inProgress: this.TASK_STATUS.inProgress,
      completed: this.TASK_STATUS.completed,
      cancelled: this.TASK_STATUS.cancelled,
    },
    Projects: {
      backlog: this.TASK_STATUS.backlog,
      inProgress: this.TASK_STATUS.inProgress,
      completed: this.TASK_STATUS.completed,
      cancelled: this.TASK_STATUS.cancelled,
    },
    Learning: {
      backlog: this.TASK_STATUS.backlog,
      inProgress: this.TASK_STATUS.inProgress,
      completed: this.TASK_STATUS.completed,
    },
  });
}
