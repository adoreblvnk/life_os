#!/bin/bash

# execute in base directory (ie `.../life_os`)
# `./data/demo/demo.sh`

if [ "$1" = "uninstall" ]; then
    mv "1_journal/2024-03-23.md" "data/demo/"
    mv "3_collections/projects/Debian Script.md" "data/demo/"
else
    mv "data/demo/2024-03-23.md" "1_journal/"
    mv "data/demo/Debian Script.md" "3_collections/projects/"
fi
