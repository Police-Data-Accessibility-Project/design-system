/**
 * Creates map with type inference
 *
 * UNUSED FOR NOW, but we may need it later
 */
// export function ReadonlyMapWithStringKeys<K extends string, V>(
// 	iterable: Iterable<[K, V]>
// ): ReadonlyMap<K, V> {
// 	return new Map(iterable);
// }

// type MapKeys = typeof <<map>> extends ReadonlyMap<infer K, any>
// 	? K
// 	: never;
