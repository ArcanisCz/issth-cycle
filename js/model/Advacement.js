import {Observable, BehaviorSubject, Subject} from 'rx';
import Constants from '../main/Constants';

/**
 * @param {Object} sources
 */
function Advacement(sources) {
    "use strict";

    return Observable.timer(2000).map(e => ({
        rank: Constants.ADVACEMENT_RANK.FORMATION,
        subrank: "pokus"
    })).startWith({
        rank: Constants.ADVACEMENT_RANK.CONDENSATION,
        subrank: "aaaa"
    })
}

/**
 * @typedef {Object} Advacement.result
 * @property {Observable} $
 */
/**
 * @return Resources.result
 */
export default Advacement;
