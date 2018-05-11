export default function (decorators, fetchPromise) {
  let decoratedFunc = fetchPromise;

  decorators.forEach((element) => {
    // decoratedFunc = element.apply(decoratedFunc);
    decoratedFunc = element(decoratedFunc);
  });
  return decoratedFunc;
}
