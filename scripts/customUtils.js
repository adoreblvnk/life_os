class CustomUtils {
  // NOTE: methods that use Dataview require dv to be passed as a parameter.
  // CustomJS does not load Dataview.
  taskRenderPerFolder(dv, folders, query, groupByFile = false) {
    let anyResult;
    for (let i in folders) {
      // TODO: rewrite to not use eval
      const queryResults = dv.pages(folders[i]).file.tasks.where(eval(query));
      if (queryResults.length > 0) {
        anyResult = true;
        // get last directory then trim trailing double quote
        let dashboard = folders[i].split("/").pop().slice(0, -1);
        // pretty display page using alias
        dv.header(3, `[[${dashboard}|${dv.page(dashboard).aliases}]]`);
        dv.taskList(queryResults, groupByFile);
      }
    }
    return anyResult;
  }

  taskRender(dv, folder, query, noResultMessage = true, groupByFile = false) {
    // TODO: rewrite to not use eval
    const queryResults = dv.pages(folder).file.tasks.where(eval(query));
    if (queryResults.length > 0) {
      // NOTE: groupByFile is by default false, unlike default behaviour in
      // https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/#dvtasklisttasks-groupbyfile
      dv.taskList(queryResults, groupByFile);
    } else if (noResultMessage) {
      dv.paragraph("No tasks left.");
    }
    return queryResults.length > 0;
  }
}
