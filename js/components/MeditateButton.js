import {Observable} from 'rx';
import {div} from '@cycle/dom';
import isolate from "@cycle/isolate";


function MeditateButton(sources) {
    //const props$ = sources.$props;
    const inputValue$ = sources.DOM
        .select('.meditate-button ')
        .events('click')
        //.map(e => e.target.value)
        //.startWith('');

    const vTree$ = sources.props$.map(props =>
        div('.meditate-button', {}, [
            props.text
        ])
    );

    inputValue$.subscribe(value => console.log(value));

    return {
        DOM: vTree$
    };
}

export default sources => isolate(MeditateButton)(sources)
