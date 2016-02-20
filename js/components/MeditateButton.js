import {Observable} from 'rx';
import {div, button} from '@cycle/dom';
import isolate from "@cycle/isolate";


function MeditateButton(sources) {

    const actions = intent(sources.DOM, sources.props$);

    const state$ = model(actions);


    //actions.subscribe(value => console.log(value));

    console.log(state$);

    return {
        DOM: view(state$)
    };
}

function intent(DOM, props$) {
    "use strict";
    console.log(DOM);
    return {
        add$: DOM
            //.select('.meditate-button')
            .events('click')
            .map(e => 1),
        props$: props$
    }
}

function model(actions) {
    "use strict";
    return Observable.combineLatest(
        actions.props$,
        actions.add$.scan((x,y) => x+y).startWith(0),
        (props, value) => ({props, value})
    );
}

function view(state$) {
    "use strict";
    return state$.map(({props, value}) =>{
        console.log(props, value);
        return div('.meditate-button', {}, [
            props.text+" "+value
        ])
    }
    );
}

export default sources => isolate(MeditateButton)(sources)
