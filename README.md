# RepoGuide

A free, open-source browser tool for exploring public GitHub repositories.

## Current features

- Accept a GitHub repository URL or `owner/repository`.
- View its description, default branch, language breakdown and root files.
- Find README, contributing, license, documentation, example and test entry points.
- Follow links to the original repository.
- Download a Markdown onboarding report to keep or share.
- No dependencies, sign-in, API key or paid API calls.

**Status:** early prototype. This version uses GitHub's public API, not an AI model. Claude explanations and guided onboarding are planned, not implemented. No claims of existing customers, funding or startup-program acceptance are made.

## Run locally

With Python installed, run from the repository folder:

```sh
python -m http.server 8000 --directory docs
```

Open http://localhost:8000. Alternatively, use any static web server.

## Publish for free with GitHub Pages

In repository Settings → Pages, select **Deploy from a branch**, choose **main** and **/docs**, and save. For a public repository on GitHub Free, branch-based Pages publishing is free.

Live prototype: https://repoguide-ankur.mooo.com/

Website hosting does not include a matching email mailbox.

## Validation

```sh
node --test tests/core.test.cjs
```

GitHub Actions runs these tests and JavaScript syntax checks on every push and pull request. No package installation or paid service is required.

## Privacy and limitations

The browser requests data directly from `api.github.com`. GitHub receives the visitor's requests and applies unauthenticated API limits. No credentials are requested and no searches are saved by this app. Only public metadata and top-level files are inspected; this is not a full codebase analysis. Repository text is inserted as plain text, never executable HTML.

## Roadmap

1. Gather feedback on the metadata explorer.
2. Design an optional Claude service for grounded code explanations.
3. If API credits are approved, prototype that service with explicit quotas and no automatic paid fallback. Keep API keys on the server, never in this public website.

## License

MIT. Maintained by [ankurrana9898-boop](https://github.com/ankurrana9898-boop).
