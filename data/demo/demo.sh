#!/bin/bash

# execute in base directory (ie `.../life_os`)
# `./data/demo/demo.sh`

demo_folder="data/demo"

if [ "$1" = "uninstall" ]; then
    mv "1_journal/2024-03-23.md" $demo_folder
    mv "3_collections/projects/Debian Script.md" $demo_folder
    mv "2_primary/quick_notes/Dinner Date.md" $demo_folder
else
    mv "$demo_folder/2024-03-23.md" "1_journal"
    mv "$demo_folder/Debian Script.md" "3_collections/projects"
    mv "$demo_folder/Dinner Date.md" "2_primary/quick_notes"
fi
