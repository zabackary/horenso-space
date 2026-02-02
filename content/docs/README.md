# Docs content

Place Markdown files under `content/docs/<lang>/`.

- Each Markdown file must include YAML frontmatter (e.g. `title`, `publishDate`, `author`).
- `index.md` becomes the language landing page (`/docs/<lang>`).
- Other files map to routes by path, for example:
  - `content/docs/en/getting-started.md` → `/docs/en/getting-started`
  - `content/docs/ja/club/invite.md` → `/docs/ja/club/invite`
