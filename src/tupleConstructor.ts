/**
 * A base type to extend in order to mimic the tuple types behavior.
 */
const TupleConstructor: new <T, Y>(...p: [T | null, Y | null]) => [
  T | null,
  Y | null
] = Array as any; // eslint-disable-line @typescript-eslint/no-explicit-any

export default TupleConstructor;
