'use strict';
const form = document.querySelector('#repo-form');
const status = document.querySelector('#status');
const result = document.querySelector('#result');
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
async function readJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) {
    if (response.status === 404) throw new Error('Repository not found. Check the spelling and make sure it is public.');
    if (response.status === 403 || response.status === 429) throw new Error('GitHub has limited these requests. Try again later.');
    throw new Error('GitHub could not return this repository. Please try again.');
  }
  return response.json();
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  result.hidden = true;
  result.replaceChildren();
  status.textContent = 'Reading public repository details…';
  try {
    const parsed = RepoGuide.parseRepository(form.repository.value);
    const base = 'https://api.github.com/repos/' + encodeURIComponent(parsed.owner) + '/' + encodeURIComponent(parsed.repo);
    const repo = await readJson(base);
    const [languages, contents] = await Promise.all([readJson(base + '/languages'), repo.size === 0 ? Promise.resolve([]) : readJson(base + '/contents?ref=' + encodeURIComponent(repo.default_branch))]);
    if (!Array.isArray(contents)) throw new Error('GitHub returned an unexpected directory format.');
    const data = RepoGuide.summarize(repo, languages, contents);
    result.append(element('h2', data.name), element('p', data.description), element('p', 'Default branch: ' + data.branch + (data.archived ? ' · Archived' : '')));
    result.append(element('h3', 'Languages'));
    const languageList = element('ul', undefined, 'language-list');
    for (const language of data.languages) languageList.append(element('li', language.name + ' ' + language.percent + '%'));
    result.append(languageList);
    if (!data.languages.length) result.append(element('p', 'No language data available.'));
    result.append(element('h3', 'Start reading'), element('p', data.guides.length ? data.guides.join(', ') : 'Look for a README or documentation in the files below.'));
    result.append(element('h3', 'Top-level files'));
    const list = element('ul', undefined, 'file-list');
    for (const file of contents) {
      const li = element('li');
      const link = element('a', file.name + (file.type === 'dir' ? '/' : ''));
      const kind = file.type === 'dir' ? 'tree' : 'blob';
      link.href = 'https://github.com/' + encodeURIComponent(parsed.owner) + '/' + encodeURIComponent(parsed.repo) + '/' + kind + '/' + encodeURIComponent(repo.default_branch) + '/' + file.path.split('/').map(encodeURIComponent).join('/');
      li.append(link); list.append(li);
    }
    result.append(list);
    if (!contents.length) result.append(element('p', 'This repository has no files yet.'));
    const download = element('button', 'Download Markdown report');
    download.type = 'button';
    download.addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([RepoGuide.toMarkdown(data)], {type: 'text/markdown;charset=utf-8'}));
      const link = element('a');
      link.href = url;
      link.download = parsed.repo + '-repoguide.md';
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    result.append(download);
    result.hidden = false;
    status.textContent = 'Overview ready. Language percentages are based on code bytes, not file counts.';
  } catch (error) {
    status.textContent = error.name === 'TimeoutError' ? 'GitHub took too long to respond. Please try again.' : error instanceof TypeError ? 'Could not connect to GitHub. Check your internet connection and try again.' : error.message;
  } finally { button.disabled = false; }
});
