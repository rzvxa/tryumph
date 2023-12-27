# tryumph

![GitHub License](https://img.shields.io/github/license/rzvxa/tryumph)
[![Test](https://github.com/rzvxa/tryumph/actions/workflows/test.yml/badge.svg)](https://github.com/rzvxa/tryumph/actions/workflows/test.yml)

Bring the "Umph" back to the JavaScript error handling!

## What is it?
```js
  const result = await try$(itMayThrow(a, b, c));
  result.match(
    when(Ok, consumeResult),
    when(Err, handleError)
  );
```

Does that seem too rusty? What about something like this? Let's Go!
```js
  const [res, err] = await try$(itMayThrow(a, b, c));
  if (!!err) {
    handleError(err);
    return;
  }
  consumeResult(res);
```

You may say these are all async, What about sync operations? Here are the examples above but this time as sync functions.
```js
  const result = tryFn$(itMayThrow, a, b, c);
  result.match(
    when(Ok, consumeResult),
    when(Err, handleError)
  );
```
Or
```js
  const [res, err] = tryFn$(itMayThrow, a, b, c);
  if (!!err) {
    handleError(err);
    return;
  }
  consumeResult(res);
```

## But Why?
We all have been in places where we want to get some result from a function that can throw, This is especially true for async functions since we usually need async operations to handle IO.
So let's take a look at this example:

```js
axios
  .get("/user/12345")
  .then((result) => consumeResult(result))
  .catch((error) => handleError(error));
```

It is the snippet of code from `ErrorHandling` section of `axios` library. So what about `async/await`?
If we want to handle the errors properly with `async/await` pattern we have to write it inside a `try/catch` block like this:
```js
  try {
    const resp = await axios.get("/user/12345");
    consumeResult(resp);
  } catch (err) {
    handleError(err);
  }
```

That is still not that bad, Right?
What if we want to handle errors by using a default value instead of canceling the operation?
Now we have to rewrite our code like this:
```js
  let user = null;
  try {
    user = await axios.get("/user/12345");
  } catch {
    user = defaultUser;
  }
  consumeResult(user);
```
How about when we would like to load some additional data based on the first request? So let's modify the code above to load the user avatar too.
```js
  let user = null;
  let avatar = null;
  try {
    user = await axios.get("/user/12345");
    avatar = await axios.get(user.avatarImage);
  } catch {
    if (!user) {
      user = defaultUser;
    }
    if (!avatar) {
      avatar = defaultAvatar;
    }
  }
  consumeResult(user, avatar);

```
As you can see it really easily gets out of hand... So let's rewrite it using `tryumph`!
```js
  const userResult = await try$(axios.get("/user/12345"));
  const user = userResult.unwrapOr(defaultUser);
  const avatarResult = await try$(axios.get(user.avatarImage));
  const avatar = avatarResult.unwrapOr(defaultAvatar);
  consumeResult(user, avatar);
```
Much cleaner huh? `tryumph` borrows heavily from `Rust` and `Go` error handling to provide a more sane way for keeping errors under control!

## Roadmap

- [ ] Make it feature complete
- [ ] Write additional tests to cover more edge cases
- [ ] Full documentation
- [ ] Examples
- [ ] Publish production-ready release

## More examples

What is in Result?
```js
  const a = await try$(itWillBeFine());
  console.log(result.isOk()); // true
  console.log(result.isErr()); // false
  console.log(result.ok()); // "Result"
  console.log(result.error()); // undefined
  console.log(result.unwrap()); // "Result"
  console.log(result.unwrapOr("Default")); // "Result"
  const b = await try$(itWillThrow());
  console.log(result.isOk()); // false
  console.log(result.isErr()); // true
  console.log(result.ok()); // undefined
  console.log(result.error()); // "Error"
  console.log(result.unwrap()); // CRASH!! it will throw the error!
  console.log(result.unwrapOr("Default")); // "Default"
```

Here is another sync example
```js
  const sum = (a, b) => a + b;
  const [res, err] = tryFn$(sum, 1, 2);
  if (!!err) {
    handleError(err);
    return;
  }
  consumeResult(res);

```
