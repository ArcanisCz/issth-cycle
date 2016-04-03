import {Observable} from 'rx';
import Constants from '../main/Constants';

/**
 * @param {Object} sources
 * @param {Resources.result} sources.resources
 * @return Observable
 */
export default function Advacement(sources) {
    "use strict";

    var condensationRanks = createCondensationRanks(sources.resources.qi$);

    return Observable.merge(condensationRanks).do(e => console.log("e", e));
}

function createCondensationRanks(qi$) {
    "use strict";
    var ranks = [];

    ranks.push(Observable.just({
        rank: Constants.ADVACEMENT_RANK.CONDENSATION,
        subrank: Constants.CONDENSATION_SUBRANK.ZERO
    }));

    ranks.push(qi$
        .filter(qi => qi.max > 5)
        .map(e => ({
            rank: Constants.ADVACEMENT_RANK.CONDENSATION,
            subrank: Constants.CONDENSATION_SUBRANK.ONE
        }))
        .first());

    ranks.push(qi$
        .filter(qi => qi.max > 6)
        .map(e => ({
            rank: Constants.ADVACEMENT_RANK.CONDENSATION,
            subrank: Constants.CONDENSATION_SUBRANK.TWO
        }))
        .first());

    return ranks;
}
