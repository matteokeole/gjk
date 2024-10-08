import {Vector3} from "../src/math/index.js";
import {negate} from "./helpers.js";

/**
 * @param {Vector3[]} simplex
 * @param {Vector3} D
 */
export function check1dSimplex(simplex, D) {
	const [b, a] = simplex;
	const ab = new Vector3(b).subtract(a);
	const ao = negate(new Vector3(a));

	if (ab.dot(ao) > 0) {
		D.set(ab.cross(ao).cross(ab));

		return false;
	}

	simplex.length = 0;
	simplex.push(a);
	D.set(ao);

	return false;
}