const { CustomUtils } = customJS;

CustomUtils.navbarMain(dv);
if (dv.current().pageType == "Journal") {
  CustomUtils.navbarJournal(dv);
}
