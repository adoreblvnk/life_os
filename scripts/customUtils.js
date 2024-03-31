class CustomUtils {
  // NOTE: methods that use Dataview require dv to be passed as a parameter.

  // configs
  get MAIN_PAGES() {
    return [
      "Life_OS",
      "Journal",
      "Tasks",
      "Life_Stages",
      "Projects",
      "Learning",
      "Writings",
    ];
  }

  // Renders navbar for main dashboard pages
  // <page> | **<current_page>** ...
  navbarMain(dv) {
    let navbar = "";
    for (let i = 0; i < this.MAIN_PAGES.length - 1; i++) {
      let pg = this.MAIN_PAGES[i];
      if (dv.current().file.name == pg) {
        navbar += `**[[${pg}|${dv.page(pg).file.aliases[0]}]]** | `;
      } else {
        navbar += `[[${pg}|${dv.page(pg).file.aliases[0]}]] | `;
      }
    }
    let lastPg = this.MAIN_PAGES.at(-1);
    navbar += `[[${lastPg}|${dv.page(lastPg).file.aliases[0]}]]`;
    dv.paragraph(navbar);
    return;
  }

  navbarJournal(dv) {
    let yesterday = moment(dv.current().file.name)
      .subtract(1, "d")
      .format("YYYY-MM-DD");
    let tomorrow = moment(dv.current().file.name)
      .add(1, "d")
      .format("YYYY-MM-DD");
    dv.paragraph(`[[${yesterday}|Yesterday]] | [[${tomorrow}|Tomorrow]]`);
    return;
  }

  // CustomJS does not load Dataview.
  taskRenderPerFolder(dv, folders, query, groupByFile = false) {
    let result;
    for (let i in folders) {
      // TODO: rewrite to not use eval
      // executes query & limits results to 5 tasks per folder
      let queryResults = dv
        .pages(folders[i])
        .file.tasks.where(eval(query))
        .slice(0, 5);
      if (queryResults.length > 0) {
        result = true;
        // get last directory then trim trailing double quote
        let dashboard = folders[i].split("/").pop().slice(0, -1);
        // pretty display page using alias
        dv.header(3, `[[${dashboard}|${dv.page(dashboard).aliases}]]`);
        dv.taskList(queryResults, groupByFile);
      }
    }
    return result;
  }

  taskRender(dv, folder, query, noResultMessage = true, groupByFile = false) {
    // TODO: rewrite to not use eval
    // executes query & limits results to 10 tasks
    let queryResults = dv
      .pages(folder)
      .file.tasks.where(eval(query))
      .slice(0, 10);
    if (queryResults.length > 0) {
      // NOTE: groupByFile defaults to false, unlike default behaviour in
      // https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/#dvtasklisttasks-groupbyfile
      dv.taskList(queryResults, groupByFile);
    } else if (noResultMessage) {
      dv.paragraph("No tasks left.");
    }
    return queryResults.length > 0;
  }

  taskRenderCurrent(dv, query, noResultMessage = true) {
    // TODO: rewrite to not use eval
    // executes query & limits results to 10 tasks
    let queryResults = dv.current().file.tasks.where(eval(query));
    if (queryResults.length > 0) {
      dv.taskList(queryResults, false);
    } else if (noResultMessage) {
      dv.paragraph("No tasks.");
    }
    return queryResults.length > 0;
  }
}
