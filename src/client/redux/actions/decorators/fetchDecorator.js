export default function (decorators, fetchPromise) {
  let decoratedFunc = fetchPromise;

  decorators.forEach((element) => {
    decoratedFunc = element(decoratedFunc);
  });
  return decoratedFunc;
}
