#!/bin/bash

set -euo pipefail

# constants
readonly VERSION="v0.0.2"
readonly PERSONAL="personal"

# ----- PRINT FUNCTIONS -----

# set text colours if supported
_colours() {
  if [[ "$(tput colors)" -ge 8 ]] \
    && [[ $1 == true ]]; then
    NC="$(tput sgr0)" # text reset (select graphic representation default)
    BOLD="$(tput bold)"
    RED="$(tput setaf 1)"            # red
    GREEN="$(tput setaf 2)"          # green
    YELLOW="$(tput setaf 3)"         # yellow
    BLUE="$(tput setaf 4)"           # blue
    MAGENTA="$(tput setaf 5)"        # magenta
    CYAN="$(tput setaf 6)"           # cyan
    B_RED="$(tput bold setaf 1)"     # bold red
    B_GREEN="$(tput bold setaf 2)"   # bold green
    B_YELLOW="$(tput bold setaf 3)"  # bold yellow
    B_BLUE="$(tput bold setaf 4)"    # bold blue
    B_MAGENTA="$(tput bold setaf 5)" # bold magenta
    B_CYAN="$(tput bold setaf 6)"    # bold cyan
  # don't set colours if argument is false (or not given). use `_colours false` for readability
  else
    NC=
    BOLD=
    RED=
    GREEN=
    YELLOW=
    BLUE=
    MAGENTA=
    CYAN=
    B_RED=
    B_GREEN=
    B_YELLOW=
    B_BLUE=
    B_MAGENTA=
    B_CYAN=
  fi
}

# info message text
_info_msg() { echo "${B_BLUE}Info:${NC} $1"; }

# success message text
_success_msg() { echo "${B_GREEN}Success:${NC} $1"; }

# warning message text
_warning_msg() { echo "${B_YELLOW}Warning:${NC} $1"; }

# error message text
_error_msg() { echo "${B_RED}Error:${NC} $1"; }

_usage() {
  cat <<EOF
${BOLD}LIFE_OS${NC} - Life management system to organise & manage your life as an Obsidian vault.

${YELLOW}Usage:${NC} ./life_os ${CYAN}[Options]${NC} ${CYAN}[Command]${NC}

${YELLOW}Options:${NC}
  ${GREEN}    --no-colour${NC} Do not output any colour. Useful when redirecting output to a logfile
  ${GREEN}-h, --help     ${NC} Print help information

${YELLOW}Commands:${NC}
  ${GREEN}u, update      ${NC} Update Life OS to the latest release
  ${GREEN}h, help        ${NC} Print help information


${YELLOW}Example:${NC}
  ./life_os ${CYAN}--no-colour update${NC}

EOF
}

# ----- COMMANDS -----

update() {
  _info_msg "Starting Life OS update"
  _info_msg "Getting latest release version"
  git fetch --tags
  _info_msg "Updating master"
  git checkout master
  git pull
  git checkout "$PERSONAL"
  local current_ver=$(git describe --tags --abbrev=0)
  local latest_ver=$(git describe --tags --abbrev=0 master)
  if [[ "$current_ver" == "$latest_ver" ]]; then
    _info_msg "Current version of Life OS (${current_ver}) is the latest"
  else
    _info_msg "Rebasing $PERSONAL branch onto $latest_ver of Life OS"
    git rebase --onto "$latest_ver" master "$PERSONAL"
    _info_msg "Updating $PERSONAL remote"
    git push -f
    _success_msg "Updated to $latest_ver"
  fi
}

# ----- MAIN -----

main() {
  # PRINT FUNCTIONS
  _colours true

  [[ $# -gt 0 ]] || {
    _usage
    _error_msg "No argument(s)"
    exit 1
  }

  while [[ $# -gt 0 ]]; do
    case $1 in
      # OPTIONS
      --no-colour) _colours false ;;
      # COMMANDS
      u | update) update ;;
      -h | --help | h | help) _usage ;;
      *)
        _usage
        _error_msg "Invalid argument(s)"
        exit 1
        ;;
    esac
    shift
  done
}

main "$@"
