# RepoGuide: proposed startup direction

## Customer and problem

Students, junior developers and maintainers often struggle to find where to start in an unfamiliar GitHub repository. RepoGuide aims to shorten the path from opening a repository to understanding its structure and making a useful contribution.

## First product

The published prototype displays public GitHub metadata, language breakdowns, root files and documentation entry points. It works without a paid API. It is an early prototype, with no validated customers or revenue claimed.

## Planned Claude features

An optional server-side service could explain selected files, identify likely entry points and suggest a reading order, with links to the source supporting each explanation. These features are planned and not implemented. Private repositories, write access and autonomous code changes are outside the initial scope.

## Next milestones

1. Use the prototype with three different public repositories and record what helps and what is missing.
2. Invite five developers to try it and voluntarily share feedback. Do not send unsolicited bulk messages.
3. Confirm the founder wants to pursue this product and record the actual project starting date.
4. Resolve project email delivery. The current FreeDNS subdomain restricts MX records. Consider an owned domain and forwarding within the founder's first-year budget of less than INR 1,000, after reviewing checkout and renewal prices.
5. Submit a truthful startup application after required founder details, email and Console account are ready.
6. If credits are awarded, build and evaluate a small Claude prototype with explicit usage caps. Stop at the grant limit; do not purchase credits or enable automatic reload.

## Possible business model to validate

Keep the public metadata explorer free. Investigate whether development teams would pay for repository-specific onboarding guides after the product demonstrates useful, accurate explanations. No paid service, payment processor or subscription is set up today.

## Cost constraint

The current prototype and GitHub Pages hosting require no payment. The founder permits less than INR 1,000 combined for domain and email in the first year. No purchase has been made. API spending and automatic top-ups are not enabled. Provider eligibility and startup-credit approval are not guaranteed.

## Proposed Claude pilot and success criteria

The prototype also exports Markdown reports. Five tests and JavaScript syntax checks pass in GitHub Actions. The founder has confirmed the intention to develop the product and test it with users.

For a first Claude pilot, use a server-side key to explain a user-selected public README and a small selection of files. Bound input size and output tokens, limit requests, and stop at a configured budget. Treat repository text as untrusted data. Return source links and mark uncertainty where evidence is insufficient. This integration is planned, not implemented.

Evaluate a fixed set of public repositories against their documentation and record incorrect explanations. Ask volunteers whether they can locate setup instructions and choose a first file to read. These evaluations and interviews have not yet been completed; publish actual findings when available.

## Program availability

As checked October 10, 2026, Anthropic says the USD 1,000 API credit and free Claude Team offers are over capacity and applications will be re-reviewed. Bootstrapped startups can apply, but acceptance and credits are not assured. Source: https://claude.com/programs/startups
