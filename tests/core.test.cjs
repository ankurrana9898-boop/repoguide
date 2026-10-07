const {test} = require('node:test');
const assert = require('node:assert/strict');
const {parseRepository, summarize} = require('../docs/core.js');
test('accepts names and HTTPS repository URLs', () => {
  assert.equal(parseRepository(' octocat/Hello-World ').fullName, 'octocat/Hello-World');
  assert.equal(parseRepository('https://github.com/octocat/Hello-World.git/').repo, 'Hello-World');
});
test('rejects other origins, credentials, paths and malformed names', () => {
  for (const value of ['https://evil.example/a/b','https://github.com.evil.example/a/b','https://user:pass@github.com/a/b','http://github.com/a/b','a/b/tree/main','../repo','a/..','a/b?x=1','a b/repo','/']) assert.throws(() => parseRepository(value), value);
});
test('summarizes languages in descending order and locates onboarding files', () => {
  const data = summarize({full_name:'a/b',default_branch:'main',archived:true}, {CSS:25,JavaScript:75}, [{name:'src'},{name:'README.md'},{name:'CONTRIBUTING.md'},{name:'docs'},{name:'test.js'}]);
  assert.deepEqual(data.languages, [{name:'JavaScript',percent:75},{name:'CSS',percent:25}]);
  assert.deepEqual(data.guides, ['README.md','CONTRIBUTING.md','docs','test.js']);
  assert.equal(data.archived, true);
});
test('handles empty repositories and empty language data', () => {
  const data = summarize({full_name:'a/b',default_branch:'main'}, {}, []);
  assert.deepEqual(data.languages, []);
  assert.deepEqual(data.files, []);
});
