import {Observable} from 'rx';
import {div, button, span} from '@cycle/dom';
import isolate from "@cycle/isolate";

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 *
 * @return {{DOM: Observable, click$: Observable}}
 */
export default sources => isolate(BasicButton)(sources)

function BasicButton(sources) {
    const actions = intent(sources.DOM, sources.props$);
    const state$ = model(actions);
    return {
        DOM: view(state$),
        click$: actions.click$.share()
    };
}

/**
 * @param {Observable} DOM
 * @param {Observable} props$
 */
function intent(DOM, props$) {
    var enabled$ = props$.map(props => props.enabled);
    return {
        click$: DOM.events('click').pausable(enabled$),
        hover$: Observable.merge(
            DOM.events("mouseover").map(e=>true),
            DOM.events("mouseout").map(e=>false)
            )
            .debounce(0)
            .distinctUntilChanged()
            .startWith(false),
        props$: props$,
        enabled$: enabled$
    }
}

function model(actions) {
    return Observable.combineLatest(
        actions.props$,
        actions.enabled$,
        actions.hover$,
        (props, enabled, hover)=> ({
            tooltip: hover && props.tooltip ? props.tooltip : false,
            text: props.text,
            classes: (enabled ? "enabled" : "disabled") + (props.display ? " show" : " hide")
        }))
        .distinctUntilChanged()
}

function view(state$) {
    return state$.map(({text, classes, tooltip}) => {
            const tooltipElement = [];
            if (tooltip) {
                tooltipElement.push(span(tooltip))
            }
            return div('.meditate-button', {
                className: classes
            }, [
                text,
                tooltipElement
            ])
        }
    );
}