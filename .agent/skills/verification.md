---
name: Agent Verification Protocol
description: Enforces the mandatory Plan -> Execute -> Verify loop to prevent Sentenced Confidence.
---

# 🚨 THE VERIFICATION RULE: AVOID "SENTENCED CONFIDENCE" 🚨

Antigravity Agents operating in this workspace MUST follow this strict verification protocol before reporting any task as "Done" or "Completed" to the Boss (the User).

## 1. The Core Rule

Never tell the Boss a task is "Done" until you have physically verified the destination folder, checked the live URL, or queried the database. 

*   You cannot assume a script succeeded just because it didn't return an error.
*   You cannot assume an API call worked just because you sent the payload.
*   You must *prove* the result exists.

## 2. Verification Methods

Depending on the task, you must use one of the following methods to prove completion:

### A. Folder & File Audits (For Media/Code generation)
If you saved a file, generated a video, or created a component:
*   Use `view_file` or `list_dir` to confirm the file exists in the exact path you specified.
*   If the file is missing, retry the generation step ONCE before reporting an error to the Boss.

### B. Browser Verification (The "Eyes")
If you modified UI code, deployed to Vercel, or changed CSS:
*   Launch the Browser Agent (if available) to navigate to the local development server or the live preview URL.
*   Check that the targeted element is visible, not overflowing, and matches the expected layout.
*   Ensure no hydration errors or console alerts are present. 

### C. Data Integrity Checks (Supabase/Database)
If you inserted, updated, or deleted rows:
*   Run a `SELECT` query to physically count the rows and verify their column values.
*   Check for duplicates. Ensure you didn't upload the same payload twice.

## 3. Reporting the Result

When you report back to the Boss, do not just say "Done." Say:
> "Task complete. I have verified that `[X]` exists at `[Y]` using `[Verification Method]`."
