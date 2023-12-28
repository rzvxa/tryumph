/**
 * A base type to extend in order to mimic the tuple types behavior.
 */
declare const TupleConstructor: new <T, Y>(...p: [T | null, Y | null]) => [
    T | null,
    Y | null
];
export default TupleConstructor;
//# sourceMappingURL=tupleConstructor.d.ts.map