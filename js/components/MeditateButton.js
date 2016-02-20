import {Observable} from 'rx';
import {div} from '@cycle/dom';
import isolate from "@cycle/isolate";


function MeditateButton(sources) {
    //const props$ = sources.$props;
    //const inputValue$ = sources.DOM
    //    .select('.meditate ')
    //    .events('input')
    //    .map(e => e.target.value)
    //    .startWith('');

    const vTree$ = sources.props$.map(props =>
        div('.meditate', {}, [
            props.text
        ])
    );

    //inputValue$.subscribe(value => console.log(value));

    return {
        DOM: vTree$
    };
}

export default sources => isolate(MeditateButton)(sources)
