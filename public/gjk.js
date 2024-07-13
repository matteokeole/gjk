import {Vector3} from "../src/math/index.js";
import {Shape} from "../src/Shape/index.js";
import {lineCase} from "./lineCase.js";
import {negate} from "./negate.js";
import {support} from "./support.js";
import {triangleCase} from "./triangleCase.js";

/**
 * Max iterations tested: 4
 */
const MAX_ITERATIONS = 8;

/**
 * @param {Shape} shape1
 * @param {Shape} shape2
 */
export function gjk(shape1, shape2) {
	/**
	 * Found (0, 1, 0) to result in no more than 3 iterations
	 * before getting a response
	 */
	const D = new Vector3(0, 1, 0);
	const a = support(shape1, shape2, D);

	if (a.dot(D) < 0) {
		return null;
	}

	const simplex = [a];

	D.set(a);
	negate(D);

	for (let i = 0; i < MAX_ITERATIONS; i++) {
		const a = support(shape1, shape2, D);

		if (a.dot(D) < 0) {
			return null;
		}

		simplex.push(a);

		if (simplex.length === 2) {
			lineCase(simplex, D);

			continue;
		}

		if (simplex.length === 3) {
			if (triangleCase(simplex, D)) {
				return simplex;
			}
		}
	}

	return null;
}