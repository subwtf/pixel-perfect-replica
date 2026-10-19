<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the static Vite app's Tailwind v4 integration enabled with @tailwindcss/vite so utility styles are generated.
- Initialize browser theme before rendering, and handle unavailable browser storage in the shared theme module so theme selection cannot break the app.
- Render route head metadata with TanStack Router HeadContent in the root layout so client-side page changes update document metadata.
