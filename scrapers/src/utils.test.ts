import test from 'node:test';
import assert from 'node:assert/strict';
import axios from 'axios';
import { getInfoFromAside } from './utils';

test('current HTTP and HTML parsers preserve character metadata without live wiki traffic', async () => {
  const original = axios.defaults.adapter;
  axios.defaults.adapter = async config => ({config, status: 200, statusText: 'OK', headers: {}, data: `
    <div id="mw-content-text"><div><p>Monkey D. Luffy[1] is a pirate.</p></div></div>
    <aside><img src="https://fixture.invalid/luffy.png/revision/latest"><section><h2>Statistics</h2>
      <div><h3>Romanized Name:</h3><div>Monkey D. Luffy[2]</div></div>
      <div><h3>Affiliations:</h3><div><ul><li>Straw Hat Pirates[3]</li><li>Grand Fleet</li></ul></div></div>
    </section></aside>`});
  try {
    const parsed = await getInfoFromAside('https://fixture.invalid/character') as any;
    assert.equal(parsed.description, 'Monkey D. Luffy is a pirate.');
    assert.equal(parsed.image, 'https://fixture.invalid/luffy.png');
    assert.equal(parsed.Statistics['Romanized Name'], 'Monkey D. Luffy');
    assert.deepEqual(parsed.Statistics.Affiliations, ['Straw Hat Pirates', 'Grand Fleet']);
  } finally { axios.defaults.adapter = original; }
});
