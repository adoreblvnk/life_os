/**
 * Helper functions for rendering Dataview queries
 */
class CustomUtils extends customJS.Config.constructor {
  // NOTE: methods that use Dataview require dv to be passed as a parameter.

  /**
   * Gets pages containing task query results in current page (default) or
   * folder
   * @param {object} dv - DataviewAPI
   * @param {string} query - WHERE clause query
   * @param {string} [folder] - Folder path. Defaults to current page if empty
   * @param {number} [limit] - Restricts to N tasks. Defaults to 20
   * @returns Dataview object of queried tasks
   */
  #getTasks(dv, query, folder = null, limit = 20) {
    let pageResults = folder ? dv.pages(`"${folder}"`) : dv.current();
    // first WHERE clause filters for tasks with text, no parent task, & under
    // Task section.
    // sorted by due date in ascending order, with no due date at the back
    return pageResults.file.tasks
      .where((t) => t.text && !t.parent && t.section.subpath == "📝 Tasks")
      .where(new Function("return " + query)())
      .sort((t) => t.due ?? "")
      .limit(limit);
  }

  /**
   * Renders navbar for dashboard pages
   * @param {object} dv - DataviewAPI
   * @example
   * // <page> | **<current_page>** | <page> ...
   */
  navbarMain(dv) {
    let navbar = "**[[Life_OS|Life OS]]** | ";
    for (const pg in this.DASHBOARDS) {
      // list dashboard name if current page type, else use emoji (1st element) to represent dashboard
      if (dv.current().file.name == pg) {
        navbar += `**[[${pg}|${dv.page(pg).file.aliases[0]}]]** | `;
      } else {
        navbar += `[[${pg}|${Array.from(dv.page(pg).file.aliases[0])[0]}]] | `;
      }
    }
    // remove last 3 characters (space + | + space) from navbar
    dv.paragraph(navbar.slice(0, -3));

    // render journal navbar if current page is a journal
    if (dv.current().pageType == "Journal") {
      const previous = moment(dv.current().file.name)
        .subtract(1, "d")
        .format("YYYY-MM-DD");
      const next = moment(dv.current().file.name)
        .add(1, "d")
        .format("YYYY-MM-DD");
      dv.paragraph(`[[${previous}|Previous Day]] | [[${next}|Next Day]]`);
    }
  }

  /**
   * List past journals, sorted from newest to oldest TODO: refactor
   * @param {object} dv - DataviewAPI
   */
  pastJournals(dv) {
    // exclude Journal dashboard & today's journal
    dv.list(
      dv
        .pages(this.DASHBOARDS.Journal)
        .where(
          (p) =>
            !["Journal", moment().format("YYYY-MM-DD")].includes(p.file.name)
        )
        .sort((p) => p.file.name, "desc").file.link
    );
  }

  /**
   * Renders To Do tasks in current folder
   * @param {object} dv - DataviewAPI
   */
  todoTasks(dv) {
    const todo = this.TASK_STATUS.todo;
    dv.header(3, todo.header); // render header text from Config
    const taskResults = this.#getTasks(dv, todo.query, dv.current().file.folder);
    if (taskResults.length) {
      dv.taskList(taskResults, false);
    } else {
      dv.paragraph("No tasks to show.");
    }
  }
}
