const TupleConstructor: new <T, Y>(...p: [T | null, Y | null]) => [
  T | null,
  Y | null
] = Array as any;

export default TupleConstructor;
