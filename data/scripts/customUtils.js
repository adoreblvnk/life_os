/**
 * Helper functions for rendering Dataview queries
 */
class CustomUtils {
  // NOTE: methods that use Dataview require dv to be passed as a parameter.

  /**
   * Renders navbar for dashboard pages
   *
   * @param {object} dv - DataviewAPI
   * @example
   * // <page> | **<current_page>** | <page> ...
   */
  navbarMain(dv) {
    const { Config } = customJS;
    // get list of dashboard pages from Config
    let dashboards = Config.dashboards;
    let navbar = "";
    for (let i = 0; i < dashboards.length - 1; i++) {
      let pg = dashboards[i];
      // bold item if current page
      if (dv.current().file.name == pg) {
        navbar += `**[[${pg}|${dv.page(pg).file.aliases[0]}]]** | `;
      } else {
        navbar += `[[${pg}|${dv.page(pg).file.aliases[0]}]] | `;
      }
    }
    // add last item
    let lastPg = dashboards.at(-1);
    navbar += `[[${lastPg}|${dv.page(lastPg).file.aliases[0]}]]`;
    dv.paragraph(navbar);
  }

  /**
   * Renders navbar for journal
   * 
   * @param {object} dv - DataviewAPI
   * @example
   * // Yesterday | Tomorrow
   */
  navbarJournal(dv) {
    let yesterday = moment(dv.current().file.name)
      .subtract(1, "d")
      .format("YYYY-MM-DD");
    let tomorrow = moment(dv.current().file.name)
      .add(1, "d")
      .format("YYYY-MM-DD");
    dv.paragraph(`[[${yesterday}|Yesterday]] | [[${tomorrow}|Tomorrow]]`);
  }

  // PAGE LISTING

  /**
   * List pages in current folder according to page status
   *
   * @param {object} dv - DataviewAPI
   * @param {string} status - Status according to frontmatter YAML in page
   */
  listCurrentPages(dv, status) {
    const { Config } = customJS;
    // render page status header text
    dv.header(2, Config.pageStatus[status]);
    // exclude dashboard file, search pages with queried status, then sort by
    // most to least recently accessed
    let pages = dv
      .pages(`"${dv.current().file.folder}"`)
      .where((p) => p.file.name != dv.current().file.name && p.status == status)
      .sort((p) => p.file.mtime, "desc");
    if (pages.length > 0) {
      dv.list(pages.file.link);
    } else {
      dv.paragraph("No pages to show.");
    }
  }

  /**
   * List past journal entries
   *
   * @param {object} dv - DataviewAPI
   */
  pastJournals(dv) {
    const { Config } = customJS;
    // exclude Journal dashboard & today's journal, then sort from newest to
    // oldest
    dv.list(
      dv
        .pages(Config.folders.Journal)
        .file.where(
          (p) => !["Journal", moment().format("YYYY-MM-DD")].includes(p.name)
        )
        .sort((p) => p.name, "desc").link
    );
  }

  // TASKS

  /**
   * Gets pages containing task query results in current page (default) or
   * folder.
   *
   * @param {object} dv - DataviewAPI
   * @param {string} query - WHERE clause query
   * @param {string} [folder] - Folder path. Must be in format of
   * `'"<folder>"'`. Defaults to current page
   * @param {number} [limit] - Restricts to N tasks. Defaults to 20
   * @returns Dataview object of queried tasks
   */
  getTasks(dv, query, folder = null, limit = 20) {
    let pageResults = folder ? dv.pages(folder) : dv.current();
    // first WHERE clause filters for tasks with text, no parent task, & under
    // Task section.
    // sorted by due date in ascending order, with no due date at the back
    return pageResults.file.tasks
      .where(
        (t) => t.text && !t.parent && t.section.toString().includes("📝 Tasks")
      )
      .where(new Function("return " + query)())
      .sort((t) => t.due ?? "")
      .limit(limit);
  }

  /**
   * Renders tasks in current file according to task status set in Config
   *
   * @param {object} dv - DataviewAPI
   */
  renderCurrentTasks(dv) {
    const { Config } = customJS;
    // get page type from current page frontmatter
    let taskStatuses = Config.pageTaskStatuses[dv.current().pageType];
    // NOTE: `status` is not equivalent to item status in
    // https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-tasks/
    for (let status in taskStatuses) {
      // render header text from Config
      dv.header(3, taskStatuses[status].header);
      let taskResults = this.getTasks(dv, taskStatuses[status].query);
      if (taskResults.length > 0) {
        dv.taskList(taskResults, false);
      } else {
        dv.paragraph("No tasks to show.");
      }
    }
  }

  /**
   * Renders To Do tasks in current folder
   *
   * @param {object} dv - DataviewAPI
   */
  todoTasks(dv) {
    const { Config } = customJS;
    let todo = Config.pageTaskStatuses.ToDo;
    // render header text from Config
    dv.header(3, todo.header);
    let taskResults = this.getTasks(
      dv,
      todo.query,
      `"${dv.current().file.folder}"`
    );
    if (taskResults.length) {
      dv.taskList(taskResults, false);
    } else {
      dv.paragraph("No tasks to show.");
    }
  }

  /**
   * Renders global tasks according to query, split by folders
   * @param {Object} dv DataviewAPI
   * @param {string} query WHERE clause query
   */
  renderGlobalTasks(dv, query) {
    const { Config } = customJS;
    let folders = Config.folders;
    for (let folder in folders) {
      // NOTE: limit global tasks per page type to 3
      let taskResults = this.getTasks(dv, query, folders[folder], 3);
      if (taskResults.length) {
        // dv.header(3, folder)
        dv.taskList(taskResults);
      }
    }
  }
}
