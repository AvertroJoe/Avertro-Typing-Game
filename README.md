# Avertro Typing Challenge

A single-file, browser-based typing speed game built for the Avertro stand. Visitors type a target sentence as fast and accurately as possible; their time gets timed live and can be added to an on-screen leaderboard, with a mechanical keyboard given away each day of the show.

Everything — markup, styles and logic — lives in `index.html`. There's nothing to install or build: just open the file in a browser.

## How it works (attendee view)

1. The target sentence is shown in the "The sentence" card, and defaults to *"Quantify your resilience, defend your spend"*.
2. The visitor starts typing into the box below. The timer starts on their first keystroke and stops the moment the sentence is typed correctly — mistakes can be corrected with backspace, they just cost time.
3. On completion, a modal shows their time and asks for a name to add to the leaderboard (or they can skip).
4. The leaderboard keeps the fastest 10 times, with the most recent entry highlighted.
5. **Reset** clears the current attempt so the next person can go.

## Data storage

The leaderboard and any custom target sentence are stored in the browser's `localStorage`, keyed as `avertro_typing_leaderboard_v1` and `avertro_typing_target_v1`. This means:

- Scores persist between page reloads on the same device/browser.
- They do **not** sync across devices — each laptop/tablet running the game keeps its own leaderboard.
- Clearing browser data (or opening in a private/incognito window) resets it back to empty and to the default sentence.

## Admin panel

A small "Admin" link sits in the bottom-right corner of the page for staff use during the show.

**Default password: `avertro2026`** (until changed — see below)

Once unlocked, the admin panel lets you:

- **Change the target sentence** — edit the text visitors have to type, then "Save target text". Use "Restore default" to go back to the standard sentence.
- **Download the leaderboard as CSV** — exports every recorded time (not just the top 10 shown on screen) as a CSV file with columns Rank, Name, Time (s) and Recorded at. The file downloads as `Typing Game - YYYY-MM-DD.csv`, dated to the day you download it.
- **Change the admin password** — set a new password (minimum 4 characters, entered twice to confirm). This overwrites the default password on that device only, so if you change it on the show laptop, that laptop needs the new password from then on, while any other device still opens with `avertro2026` (or whatever it was last set to on that device). There is no recovery screen if you forget it, so note it down somewhere before you set it.
- **Clear the leaderboard** — wipes all recorded times on that device. This cannot be undone, so use it deliberately (e.g. between show days, or if the board fills up with test runs). Download a CSV first if you want to keep a record.

Changes made in the admin panel are saved to that browser's `localStorage`, so they only affect the device you're using at the time.

## Branding

The page follows the **Avertro Design System** (Rubik typeface, navy/blue/yellow/turquoise palette, standard button and card styles) rather than a bespoke look, so it should sit comfortably alongside other Avertro-branded materials at the stand.

## Running it

No server or build step needed — double-click `index.html` to open it in a browser, or serve the folder from any static web host if you want it running on a shared kiosk machine.
