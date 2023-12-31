import type { DeferredPromise } from "dwait";

type Dwaitable<T> = {
  /**
   * Converts the promise into a `DeferredPromise` from the `dwait` library.
   *
   * @returns The `DeferredPromise` of the actual result.
   */
  dwait: () => DeferredPromise<T>
};

export default Dwaitable;
