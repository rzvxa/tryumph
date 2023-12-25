# tryumph

WIP: published early to reserve the name

Bring the "Umph" back to the JavaScript error handling!

## What is it?
```js
  const result = await tryAsync(itMayThrow());
  result.match(
    when(Ok, consumeResult),
    when(Err, handleError)
  );
```

That seems too rusty? What about something like this? Let's Go!
```js
  const { res, err } = await tryAsync(itMayThrow());
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
So what if we want to handle errors by using a default value instead of canceling the operation?
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
How about when we want to load some additional data based on the first request? So let's modify the code above to load the user avatar too.
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
  const userResult = await tryAsync(axios.get("/user/12345"));
  const user = userResult.unwrapOr(defaultUser);
  const avatarResult = await tryAsync(axios.get(user.avatarImage));
  const avatar = avatarResult.unwrapOr(defaultAvatar);
  consumeResult(user, avatar);
```
Much cleaner huh? `tryumph` borrows heavily from `Rust` and `Go` error handling to provide a more sane way for keeping errors under control!

## Roadmap

- [ ] Make it feature complete
- [ ] Write additional tests to cover more edge cases
- [ ] Full documentation
- [ ] Examples
- [ ] Publish production ready release
