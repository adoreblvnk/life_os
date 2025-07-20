/**
 * Methods for rendering Dataview queries
 */
class CustomUtils extends customJS.Config.constructor {
  // NOTE: methods that use Dataview require dv to be passed as a parameter.

  // HELPER METHODS

  /**
   * Gets pages containing task query results in current page (default) or
   * folder
   * @param {object} dv - DataviewAPI
   * @param {string} query - WHERE clause query without the preceding "t =>" & t is tasks
   * @param {string} [folder] - Folder path. Defaults to current page if empty
   * @param {number} [limit] - Restricts to N tasks. Defaults to 20
   * @returns Dataview object of queried tasks
   */
  #getTasks(dv, query, folder = null, limit = 20) {
    const pageResults = folder ? dv.pages(`"${folder}"`) : dv.current();
    // first WHERE clause filters for tasks with text, no parent task, & under
    // Task section.
    // sorted by due date in ascending order, with no due date at the back
    return pageResults.file.tasks
      .where((t) => t.text && !t.parent && t.section.subpath == "📝 Tasks")
      .where(new Function("return t => " + query)())
      .sort((t) => t.due ?? "")
      .limit(limit);
  }

  // NAVBAR

  /**
   * Renders navbar for dashboard pages
   * @param {object} dv - DataviewAPI
   * @example
   * // <page> | **<current_page>** | <page> ...
   */
  navbarMain(dv) {
    const navbarItems = ["**[[Life_OS|Life OS]]**"];
    for (const pg in this.DASHBOARDS) {
      // list dashboard name if current page type, else use emoji (1st element) to represent dashboard
      if (dv.current().file.name == pg) {
        navbarItems.push(`**[[${pg}|${dv.page(pg).file.aliases[0]}]]**`);
      } else {
        navbarItems.push(
          `[[${pg}|${Array.from(dv.page(pg).file.aliases[0])[0]}]]`
        );
      }
    }
    dv.paragraph(navbarItems.join(" | "));

    // render journal navbar if current page is a journal
    if (dv.current().pageType == "Journal") {
      const date = moment(dv.current().file.name);
      const previous = date.clone().subtract(1, "d").format("YYYY-MM-DD");
      const next = date.clone().add(1, "d").format("YYYY-MM-DD");
      dv.paragraph(`[[${previous}|Previous Day]] | [[${next}|Next Day]]`);
    }
  }

  // PAGE LISTING

  /**
   * List pages in current folder according to page status
   * @param {object} dv - DataviewAPI
   * @param {string} status - Status according to frontmatter YAML in page
   */
  listCurrentPages(dv, status) {
    // render page status header text
    dv.header(2, this.PAGE_STATUS[status]);
    // exclude dashboard file, search pages with queried status, then sort by
    // most to least recently accessed
    const pages = dv
      .pages(`"${dv.current().file.folder}"`)
      .where((p) => p.file.name != dv.current().file.name && p.status == status)
      .sort((p) => p.file.mtime, "desc");
    pages.length > 0
      ? dv.list(pages.file.link)
      : dv.paragraph("No pages to show.");
  }

  /**
   * Lists the first note in dashboard & embeds its content if exists
   * @param {object} dv - DataviewAPI
   * @param {string} [dashboard] - Dashboard, defaults to Quick_Notes
   */
  listFirstNote(dv, dashboard = "Quick_Notes") {
    const pages = dv
      .pages(`"${this.DASHBOARDS[dashboard]}"`)
      .where((p) => p.file.name != dashboard)
      .sort((p) => p.file.mtime, "desc")
      .limit(1);
    // header text is dashboard name & if it exists, first note name
    let headerText = `[[${dashboard}|${dv.page(dashboard).file.aliases[0]}]]`;
    if (pages.length > 0) {
      headerText += ` > ${pages[0].file.link}`;
    }
    dv.header(2, headerText);
    dv.paragraph(dv.sectionLink(pages[0]?.file.path, "🗒️ Notes", true));
  }

  /**
   * List notes & embed their content
   * @param {object} dv - DataviewAPI
   */
  listNotes(dv) {
    const pages = dv
      .pages(`"${dv.current().file.folder}"`)
      .where((p) => p.file.name != dv.current().file.name)
      .sort((p) => p.file.mtime, "desc");
    for (const page of pages) {
      dv.header(3, page.file.link);
      dv.paragraph(dv.sectionLink(page.file.path, "🗒️ Notes", true));
    }
  }

  /**
   * List past journals, sorted from newest to oldest
   * @param {object} dv - DataviewAPI
   */
  pastJournals(dv) {
    // exclude Journal dashboard & today's journal
    const journal_array = dv
      .pages(`"${this.DASHBOARDS.Journal}"`)
      .where((p) => p.file.name != "Journal")
      .where((p) => p.file.name != moment().format("YYYY-MM-DD"))
      .sort((p) => p.file.name, "desc").file.link;
    dv.list(journal_array);
  }

  // TASK RENDERING

  /**
   * Renders global tasks according to query, split by folders
   * @param {Object} dv DataviewAPI
   * @param {string} query WHERE clause query
   * @param {string} [noTasksMessage="No tasks found matching the current criteria."] Message to display when no tasks are found
   */
  renderGlobalTasks(dv, query, noTasksMessage = "No tasks found matching the current criteria.") {
    let hasAnyTasks = false;
    for (const folder in this.DASHBOARDS) {
      // NOTE: limit global tasks per page type to 3
      const taskResults = this.#getTasks(dv, query, this.DASHBOARDS[folder], 3);
      if (taskResults.length) {
        dv.taskList(taskResults);
        hasAnyTasks = true;
      }
    }
    if (!hasAnyTasks) {
      dv.paragraph(noTasksMessage);
    }
  }

  /**
   * Renders tasks in current file according to task status set in Config
   * @param {object} dv - DataviewAPI
   */
  renderCurrentTasks(dv) {
    // get page type from current page frontmatter
    const taskStatuses = this.PAGE_TASK_STATUS[dv.current().pageType];
    // NOTE: `status` is not equivalent to item status in
    // https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-tasks/
    for (const status in taskStatuses) {
      dv.header(3, taskStatuses[status].header);
      let taskResults = this.#getTasks(dv, taskStatuses[status].query);
      taskResults.length
        ? dv.taskList(taskResults, false)
        : dv.paragraph("No tasks to show.");
    }
  }

  /**
   * Renders To Do tasks in current folder
   * @param {object} dv - DataviewAPI
   */
  todoTasks(dv) {
    const { header, query } = this.TASK_STATUS.todo;
    const currFolder = dv.current().file.folder;
    const taskResults = this.#getTasks(dv, query, currFolder);

    dv.header(3, header);
    taskResults.length
      ? dv.taskList(taskResults, false)
      : dv.paragraph("No tasks to show.");
  }

  /**
   * Gets number of tasks that are fully completed
   * @param {object} dv - DataviewAPI
   * @param {string} [folder] - Folder path. Defaults to global folder
   * @returns Number of tasks fully completed
   */
  completedTasks(dv, folder = this.GLOBAL_FOLDER) {
    return this.#getTasks(dv, "t.completed", folder).length;
  }

  // METADATA

  /**
   * Renders time spent on Life OS
   * @param {object} dv DataviewAPI
   */
  timeSpent(dv) {
    const allFiles = dv.pages(`"${this.GLOBAL_FOLDER}"`).file;
    const firstFile = allFiles.sort((t) => t.ctime)[0];
    const totalDays = Math.ceil(
      dv.date("now").diff(firstFile.ctime, "days").toObject().days
    );

    dv.paragraph(
      `You have been using [[Life_OS]] for ${totalDays} days, with ${allFiles.length} files & ${allFiles.tasks.length} tasks created.`
    );
  }

  /**
   * Renders 5 most recently modified pages in a list
   * @param {object} dv DataviewAPI
   */
  recentlyModified(dv) {
    const modPages = dv
      .pages(`"${this.GLOBAL_FOLDER}"`)
      .sort((p) => p.file.mtime, "desc")
      .limit(5).file.link;
    dv.list(modPages);
  }
}
