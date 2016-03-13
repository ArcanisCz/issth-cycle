import {run} from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import App from './components/App';

const {sinks, sources} = run(App, {DOM: makeDOMDriver('#root')});

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(_ => (sinks.dispose(), sources.dispose()))
}
