import {Observable} from 'rx';
import {div, img} from '@cycle/dom';
import MeditateButton from './MeditateButton';


function App(sources) {

    const meditateSources = {DOM: sources.DOM, props$: Observable.of({
        text: "aaa"
    })};
    const meditateButtonComponent = MeditateButton(meditateSources);

    const meditateSources1 = {DOM: sources.DOM, props$: Observable.of({
        text: "aaaA"
    })};
    const meditateButtonComponent1 = MeditateButton(meditateSources1);




    const vTree$ = Observable
        .combineLatest(
            meditateButtonComponent.DOM,
            meditateButtonComponent1.DOM,
            (meditateButtonComponentVTree, meditateButtonComponentVTree1) =>
                div({className: 'app'}, [
                    meditateButtonComponentVTree,
                    meditateButtonComponentVTree1
                ])
        );


    return {
        DOM: vTree$
    };
}


export default App;
