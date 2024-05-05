#!/bin/bash

# execute in base directory (ie `.../life_os`)
# `./data/demo/demo.sh`

demo_folder="data/demo"

if [ "$1" = "uninstall" ]; then
    mv "pages/0_quick_notes/Dinner Date.md" $demo_folder
    mv "pages/1_journal/2024-03-23.md" $demo_folder
    mv "pages/4_projects/Debian Setup.md" $demo_folder
else
    mv "$demo_folder/Dinner Date.md" "pages/0_quick_notes"
    mv "$demo_folder/2024-03-23.md" "pages/1_journal"
    mv "$demo_folder/Debian Setup.md" "pages/4_projects"
fi
