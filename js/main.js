import {run} from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import App from './main/App';
import storageDriver from '@cycle/storage';

const {sinks, sources} = run(App, {
    DOM: makeDOMDriver('#root'),
    //storage: storageDriver
});

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(_ => (sinks.dispose(), sources.dispose()))
}
