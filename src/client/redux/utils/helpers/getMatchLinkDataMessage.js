export default function (text, first) {
  const expression = /(https?:\/\/[^\s]+)/g;
  const regex = new RegExp(expression);
  const matches = text.match(regex);
  let match = [];

  if (matches !== null && matches.length > 0) {
    // Берем первую ссылку из массива. Например, в телеграме также обрабатывается только первая
    if (first) {
      match = matches[0];
    } else {
      match = matches;
    }
  }
  return match;
}
