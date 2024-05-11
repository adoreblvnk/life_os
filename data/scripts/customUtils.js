/**
 * Helper functions for rendering Dataview queries
 */
class CustomUtils extends customJS.Config.constructor {
  // NOTE: methods that use Dataview require dv to be passed as a parameter.

  /**
   * Renders navbar for dashboard pages
   * @param {object} dv - DataviewAPI
   * @example
   * // <page> | **<current_page>** | <page> ...
   */
  navbarMain(dv) {
    // get list of dashboard pages from Config
    let dashboards = this.DASHBOARDS;
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
   * @param {object} dv - DataviewAPI
   * @param {string} status - Status according to frontmatter YAML in page
   */
  listCurrentPages(dv, status) {
    // render page status header text
    dv.header(2, this.PAGE_STATUS[status]);
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
   * List notes & embed their content
   * @param {object} dv - DataviewAPI
   */
  listNotes(dv) {
    let pages = dv
      .pages(`"${dv.current().file.folder}"`)
      .where((p) => p.file.name != dv.current().file.name)
      .sort((p) => p.file.mtime, "desc");
    for (let page of pages) {
      dv.header(3, page.file.link);
      let content = dv.sectionLink(page.file.path, "🗒️ Notes", true);
      dv.paragraph(content);
    }
  }

  /**
   * Lists the first note & embeds its content if exists
   * @param {object} dv - DataviewAPI
   * @param {string} dashboard - Quick Notes dashboard
   */
  listFirstNote(dv, dashboard = "Quick_Notes") {
    let pages = dv
      .pages(`${this.FOLDERS[dashboard]}`)
      .where((p) => p.file.name != dashboard)
      .sort((p) => p.file.mtime, "desc")
      .limit(1);
    let headerText = `[[${dashboard}|${dv.page(dashboard).file.aliases[0]}]]`;
    if (pages.length > 0) {
      headerText += ` > ${pages[0].file.link}`;
    }
    dv.header(2, headerText);
    dv.paragraph(dv.sectionLink(pages[0]?.file.path, "🗒️ Notes", true));
  }

  /**
   * List past journal entries
   * @param {object} dv - DataviewAPI
   */
  pastJournals(dv) {
    // exclude Journal dashboard & today's journal, then sort from newest to
    // oldest
    dv.list(
      dv
        .pages(this.FOLDERS.Journal)
        .where(
          (p) =>
            !["Journal", moment().format("YYYY-MM-DD")].includes(p.file.name)
        )
        .sort((p) => p.file.name, "desc").file.link
    );
  }

  // TASKS

  /**
   * Gets pages containing task query results in current page (default) or
   * folder
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
   * @param {object} dv - DataviewAPI
   */
  renderCurrentTasks(dv) {
    // get page type from current page frontmatter
    let taskStatuses = this.PAGE_TASK_STATUSES[dv.current().pageType];
    // NOTE: `status` is not equivalent to item status in
    // https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-tasks/
    for (let status in taskStatuses) {
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
   * @param {object} dv - DataviewAPI
   */
  todoTasks(dv) {
    let todo = this.PAGE_TASK_STATUSES.ToDo;
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
    for (let folder in this.FOLDERS) {
      // NOTE: limit global tasks per page type to 3
      let taskResults = this.getTasks(dv, query, this.FOLDERS[folder], 3);
      if (taskResults.length) {
        dv.taskList(taskResults);
      }
    }
  }

  /**
   * Gets number of tasks that are fully completed
   * @param {object} dv - DataviewAPI
   * @returns Number of tasks fully completed
   */
  completedTasks(dv) {
    let taskResults = this.getTasks(
      dv,
      "t => t.fullyCompleted",
      `!"${this.EXCLUDED_FOLDER}"`
    );
    return taskResults.length;
  }

  // METADATA

  /**
   * Renders time spent on Life OS
   * @param {object} dv DataviewAPI
   */
  timeSpent(dv) {
    let firstFile = dv.pages().file.sort((t) => t.ctime)[0];
    // NOTE: dv uses Luxon
    let totalDays = Math.ceil(
      dv.date("now").diff(firstFile.ctime, "days").toObject().days
    );
    let allFiles = dv.pages(`!"${this.EXCLUDED_FOLDER}"`).file;
    let totalFiles = allFiles.length;
    let totalTasks = allFiles.tasks.length;

    dv.paragraph(
      `You have been using [[Life_OS]] for ${totalDays} days, with ${totalFiles} files & ${totalTasks} tasks created.`
    );
  }

  /**
   * Renders 5 most recently modified pages in a list
   * @param {object} dv DataviewAPI
   */
  recentlyModified(dv) {
    dv.list(
      dv
        .pages(`!"${this.EXCLUDED_FOLDER}"`)
        .sort((p) => p.file.mtime, "desc")
        .limit(5).file.link
    );
  }
}
