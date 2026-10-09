import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const script = await readFile(new URL("../app.js", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

test("page uses local assets, a restrictive CSP and accessible controls", () => {
  assert.match(html, /Content-Security-Policy/);
  assert.match(html, /script-src 'self'/);
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="app\.js" defer/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /id="loveButton" type="button"/);
  assert.doesNotMatch(html, /onclick\s*=/i);
});

test("message content is written as text and original wording is preserved", () => {
  assert.match(script, /message\.textContent = messages\[index\]/);
  assert.doesNotMatch(script, /innerHTML/);
  for (const phrase of ["Sono passati 6 anni...", "Sei una mamma meravigliosa.", "Mia Moglie ❤️"]) {
    assert.ok(script.includes(phrase), `missing original message: ${phrase}`);
  }
});

test("animation respects reduced motion and bounds live DOM elements", () => {
  assert.match(script, /prefers-reduced-motion: reduce/);
  assert.match(script, /childElementCount >= 16/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(script, /clearInterval\(heartTimer\)/);
});
