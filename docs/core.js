/* SPDX-License-Identifier: MIT */
(function (root) {
  'use strict';
  function parseRepository(value) {
    const input = value.trim();
    let path = input;
    if (/^https?:\/\//i.test(input)) {
      const url = new URL(input);
      if (url.hostname !== 'github.com' || url.protocol !== 'https:' || url.username || url.password) throw new Error('Use an HTTPS github.com URL or owner/repository.');
      path = url.pathname;
    }
    path = path.replace(/^\/+|\/+$/g, '').replace(/\.git$/, '');
    const parts = path.split('/');
    if (parts.length !== 2 || !/^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(parts[0]) || parts[0].length > 39 || !/^[a-z\d_.-]+$/i.test(parts[1]) || parts[1] === '.' || parts[1] === '..') throw new Error('Enter owner/repository or the repository homepage URL.');
    return { owner: parts[0], repo: parts[1], fullName: parts.join('/') };
  }
  function summarize(repo, languages, files) {
    const top = Object.entries(languages).sort((a,b) => b[1]-a[1]);
    const total = top.reduce((sum, entry) => sum + entry[1], 0);
    const names = files.map(file => file.name);
    const guides = names.filter(name => /^(readme|contributing|license|docs|examples|tests?)(\.|$)/i.test(name));
    return { name: repo.full_name, description: repo.description || 'No description provided.', branch: repo.default_branch, archived: Boolean(repo.archived), languages: top.map(([name, bytes]) => ({name, percent: total ? Math.round(bytes / total * 100) : 0})), guides, files: names };
  }
  const api = { parseRepository, summarize };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RepoGuide = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
