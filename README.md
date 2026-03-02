# Music Data Analysis Project

## Overview

This project analyses music listening data and displays useful insights for different users.
The application reads raw listening data and calculates results dynamically using JavaScript.

The goal of the project is to demonstrate **data processing, modular JavaScript, and basic frontend display**, rather than UI design.

The website allows a user to select a listener from a dropdown menu and view statistics based on their listening history.

The application processes the data every time a user is selected, ensuring that it can handle future datasets with the same schema.

---

# Features

The application answers the following questions for each user:

1. **Most listened song (by number of listens)**
2. **Most listened song (by listening time)**
3. **Most listened artist (by number of listens)**
4. **Most listened artist (by listening time)**
5. **Most listened song on Friday nights (5pm – 4am)**
6. **Most listened song on Friday nights based on listening time**
7. **Longest listening streak**

   * Song listened to the most times consecutively
8. **Songs listened to every day**
9. **Top genres listened to**

The results are calculated dynamically from the provided data.

---

# Project Structure

```
project/
│
├── index.html
├── main.js
├── common.mjs
├── common.test.mjs
├── data.js
└── style.css
```

### index.html

Contains the frontend structure including:

* A **dropdown menu** to select a user
* A **results section** where calculated answers are displayed

The HTML uses **semantic elements** to ensure accessibility.

---

### main.js

Handles the frontend logic:

* Populates the **user dropdown**
* Detects when a user is selected
* Calls analysis functions
* Displays results dynamically

---

### common.mjs

This file contains the **core data processing logic**.

Functions include:

* Counting listens
* Finding most frequent songs or artists
* Calculating listening time
* Detecting longest streaks
* Finding songs listened to every day
* Determining top genres

Separating this logic from the UI allows the functions to be **tested independently**.

---

### common.test.mjs

Contains **unit tests** for the data analysis functions.

Tests verify that functions behave correctly for different scenarios such as:

* Counting users
* Counting values in datasets
* Finding maximum values
* Formatting song names
* Filtering Friday night listens
* Detecting longest streaks
* Identifying top genres

Tests are written using the **Node.js built-in test runner** and **assert module**.

---

### data.js

This file provides access to the dataset through helper functions:

* `getUserIDs()`
* `getListenEvents(userID)`
* `getSong(songID)`

The application reads the data using these functions rather than hardcoding values.

---

# Key Implementation Decisions

### 1. Data is Always Processed Dynamically

The application never stores pre-calculated results.
All statistics are calculated when a user is selected.

This ensures the code works correctly even if the dataset changes.

---

### 2. Modular Code

Logic is separated into modules:

* **UI logic** → `main.js`
* **data processing logic** → `common.mjs`
* **tests** → `common.test.mjs`

This improves maintainability and testability.

---

### 3. Handling Edge Cases

The application correctly handles special cases required in the rubric:

#### User with No Data

If a user has no listening data, the application shows a message:

```
This user didn't listen to any songs.
```

#### Questions That Do Not Apply

If a question does not apply (for example no Friday night listens), the question is **not displayed at all**.

#### Fewer Than Three Genres

If fewer than three genres exist, the application only shows the available genres and does not display text such as "Top 3 genres".

---

# Accessibility

The interface was built using semantic HTML elements and proper structure to ensure it achieves **100% accessibility in Lighthouse Snapshot mode**, as required in the rubric.

---

# Running the Project Locally

Because the project uses **JavaScript modules**, the files must be served over HTTP.

Install a simple server:

```
npm install -g http-server
```

Run the server in the project folder:

```
http-server
```

Then open the provided URL in your browser.

---

# Running Tests

Run the unit tests using Node:

```
node --test
```

This will execute the tests in `common.test.mjs`.

---

# Deployment

The project is hosted online and automatically deployed when changes are merged into the main branch.

Deployment ensures the site is always accessible for review.

---

# User Stories

### View listening statistics

**As a user**
I want to select a user from a dropdown menu
**So that** I can view their music listening statistics.

**Acceptance Criteria**

* A dropdown lists all available users.
* Selecting a user updates the results displayed.
* Statistics appear immediately after selection.

---

### View most listened song

**As a user**
I want to see the song listened to the most
**So that** I can understand the user's favourite track.

**Acceptance Criteria**

* The application calculates the song with the highest number of listens.
* The result updates when a different user is selected.

---

### View most listened artist

**As a user**
I want to see the artist listened to the most
**So that** I can identify the user's favourite artist.

**Acceptance Criteria**

* Artist listens are counted correctly.
* The most listened artist is displayed clearly.

---

### View Friday night listening behaviour

**As a user**
I want to see which songs were listened to most on Friday nights
**So that** I can understand the user's weekend listening habits.

**Acceptance Criteria**

* Only listens between **Friday 5pm and Saturday 4am** are included.
* If no Friday listens exist, the question is hidden.

---

### View statistics based on listening time

**As a user**
I want to see results calculated using listening time
**So that** I can know which songs or artists the user spent the most time listening to.

**Acceptance Criteria**

* Song durations are used to calculate total listening time.
* Results are recalculated dynamically.

---

### Identify repeated listening streaks

**As a user**
I want to see the song played the most times in a row
**So that** I can identify repeated listening patterns.

**Acceptance Criteria**

* Consecutive listens are detected correctly.
* The longest streak and its length are displayed.

---

### Discover songs listened to every day

**As a user**
I want to see songs that were played every day the user listened to music
**So that** I can identify songs that were part of a daily routine.

**Acceptance Criteria**

* Songs must appear on **every listening day**.
* If none exist, the section is hidden.

---

### Understand genre preferences

**As a user**
I want to see the user's most listened genres
**So that** I can understand their music taste.

**Acceptance Criteria**

* Genres are counted correctly.
* The top three genres are displayed.
* If fewer than three exist, only the available genres are shown.

---

### Handle users with no data

**As a user**
I want to see a message if a user has no listening history
**So that** I understand why no results appear.

**Acceptance Criteria**

* If a user has zero listen events, the interface displays a message.
* No statistics sections are shown.


# Summary

This project demonstrates:

* Data processing with JavaScript
* Modular code architecture
* Unit testing
* Accessibility
* Handling edge cases
* Dynamic data analysis

The focus of the project is on **logic and data analysis**.
