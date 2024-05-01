/**
 * Helper functions for rendering Dataview queries
 */
class CustomUtils extends customJS.Config.constructor {
  // NOTE: methods that use Dataview require dv to be passed as a parameter.

  /**
   * Renders navbar for dashboard pages
   *
   * @param {object} dv - DataviewAPI
   * @example
   * // <page> | **<current_page>** | <page> ...
   */
  navbarMain(dv) {
    // get list of dashboard pages from Config
    let dashboards = this.dashboards;
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
    // render page status header text
    dv.header(2, this.pageStatus[status]);
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
   *
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
   *
   * @param {object} dv - DataviewAPI
   * @param {string} dashboard - Quick Notes dashboard
   */
  listFirstNote(dv, dashboard = "Quick_Notes") {
    let pages = dv
      .pages(`${this.folders[dashboard]}`)
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
   *
   * @param {object} dv - DataviewAPI
   */
  pastJournals(dv) {
    // exclude Journal dashboard & today's journal, then sort from newest to
    // oldest
    dv.list(
      dv
        .pages(this.folders.Journal)
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
    // get page type from current page frontmatter
    let taskStatuses = this.pageTaskStatuses[dv.current().pageType];
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
    let todo = this.pageTaskStatuses.ToDo;
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
    let folders = this.folders;
    for (let folder in folders) {
      // NOTE: limit global tasks per page type to 3
      let taskResults = this.getTasks(dv, query, folders[folder], 3);
      if (taskResults.length) {
        // dv.header(3, folder)
        dv.taskList(taskResults);
      }
    }
  }

  // METADATA

  /**
   * Renders time spent on Life OS
   * @param {object} dv DataviewAPI
   */
  timeSpent(dv) {
    let firstFile = dv.pages().file.sort((t) => t.ctime)[0];
    // NOTE: moment.js is inaccurate, hence using raw date manipulation
    let totalDays = Math.ceil(
      (new Date() - firstFile.ctime) / (1000 * 60 * 60 * 24)
    );
    // exclude data folder
    let allFiles = dv.pages('!"data"').file;
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
        .pages()
        .sort((p) => p.file.mtime, "desc")
        .limit(5).file.link
    );
  }
}
