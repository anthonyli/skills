---
name: skill-template
description: Replace this with a clear trigger description. Explain what the skill helps the agent do, and include the user phrases or contexts that should activate it.
---

# Skill Template

Use this file for the instructions an agent should load when the skill is triggered.

## When To Use

Use this skill when the user asks for the workflow described in the frontmatter description.

## Workflow

1. Understand the user's goal and required inputs.
2. Inspect any relevant files or context.
3. Execute the workflow using the smallest reliable set of steps.
4. Verify the result before reporting completion.

## Output

Return a concise summary of what was done, any files created or modified, and any verification performed.

## Bundled Resources

Add these directories only when your skill needs them:

- `scripts/` for deterministic helper scripts
- `references/` for larger docs that should be loaded only when relevant
- `assets/` for templates, images, examples, or other reusable files
