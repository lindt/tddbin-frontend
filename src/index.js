import {Controller as Main} from '../src/main/main-controller';
import {getShortcutObject, metaKey} from './_util';
import {shortcuts as aceDefaultShortcuts} from './_aceDefaultShortcuts';
import StartUp from '../src/startup';
import {xhrGet} from '../src/_external-deps/xhr.js';
import KataUrl from '../src/kata-url.js'

const onSave = () => main.onSave();

const shortcuts = aceDefaultShortcuts.concat([
  getShortcutObject([metaKey, 'S'], onSave, 'Save+Run')
]);

const appDomNode = document.getElementById('tddbin');
var main = new Main(appDomNode, {
  iframeSrcUrl: `./mocha/spec-runner.html`,
  shortcuts: shortcuts
});

const withSourceCode = (sourceCode) => {
  const onSave = () => main.onSave();
  main.setEditorContent(sourceCode);
  setTimeout(onSave, 1000);
};

const kataName = 'es5/mocha+assert/assert-api';
export const DEFAULT_KATA_URL = `http://${process.env.KATAS_SERVICE_DOMAIN}/katas/${kataName}.js`;
var xhrGetDefaultKata = xhrGet.bind(null, DEFAULT_KATA_URL);

const startUp = new StartUp(xhrGet, xhrGetDefaultKata);

const queryString = window.location.hash.replace(/^#\?/, '');
var kataUrl = KataUrl.fromQueryString(queryString);

startUp.loadSourceCode(kataUrl, withSourceCode);