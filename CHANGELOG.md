# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v0.2.0 - 2025-03-03

### Changed

- Navbar uses emojis to represent inactive dashboards to prevent navbar overflowing.
- Shifted Project Tasks section to the bottom for project type pages. Dataview rerenders Dataview blocks (inclusive of Project Tasks) frequently, causing screen jumping for elements afterwards. This is not a fix to the rerender, but reduces the annoyance as there are no elements after Project Tasks.
- Removed jump links for Project Tasks for aesthetics.

### Fixed

- Updated plugins (Homepage, Git, Tasks, Templater).

## v0.1.5 - 2025-01-03

### Fixed

- Styling inconsistencies (headings) & removed unnecessary whitespace in editing mode.

## v0.1.4 - 2024-11-10

### Fixed

- Updated plugins (fixes Homepage not loading on mobile) & `core-plugins.json` to match Obsidian v1.7.5
