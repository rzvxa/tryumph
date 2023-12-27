/**
 * A base type to extend in order to mimic the tuple types behavior.
 */
const TupleConstructor: new <T, Y>(...p: [T | null, Y | null]) => [
  T | null,
  Y | null
] = Array as any;

export default TupleConstructor;
