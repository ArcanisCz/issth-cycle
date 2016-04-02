import {Observable, BehaviorSubject, Subject} from 'rx';
import Constants from '../main/Constants';

/**
 * @param {Object} sources
 * @param {Resources.result} sources.resources
 */
function Advacement(sources) {
    "use strict";

    return sources.resources.qi$
        .map(qi => {
            if (qi.max > 9) {
                return {
                    rank: Constants.ADVACEMENT_RANK.CONDENSATION,
                    subrank: Constants.CONDENSATION_SUBRANK.TWO
                }
            } else if (qi.max > 5) {
                return {
                    rank: Constants.ADVACEMENT_RANK.CONDENSATION,
                    subrank: Constants.CONDENSATION_SUBRANK.ONE
                }
            } else {
                return {
                    rank: Constants.ADVACEMENT_RANK.CONDENSATION,
                    subrank: Constants.CONDENSATION_SUBRANK.ZERO
                }
            }
        }).startWith({
            rank: Constants.ADVACEMENT_RANK.CONDENSATION,
            subrank: Constants.CONDENSATION_SUBRANK.ZERO
        });
}

/**
 * @typedef {Object} Advacement.result
 * @property {Observable} $
 */
/**
 * @return Resources.result
 */
export default Advacement;
