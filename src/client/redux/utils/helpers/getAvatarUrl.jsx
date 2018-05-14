/**
 * Получить URL на аватар
 * Входной параметр type отвечает какой URL будет возвращён.
 * Формат полного URL: http://localhost:8055/data/default-images/default-avatar.jpg
 * Формат URL для мини версии: к имени файла прибавляем '-min'.
 * Формат URL для полной версии: к имени файла прибавляем '@2x'.
 * Например: http://localhost:8055/data/default-images/default-avatar-min.jpg
 * Например: http://localhost:8055/data/default-images/default-avatar@2x.jpg
 * @param url
 * @param type
 * mini - уменьшенный аватар (для отображения в ленте, например)
 * normal - "обычный" вариант
 * full - полный вариант (отображение полноразмерного аватара)
 * @returns {string}
 */
export default function (url, type) {
  let suffix = '';

  switch (type) {
    case 'mini':
      suffix = '-min';
      break;
    case 'normal':
      return url;
    case 'full':
      suffix = '@2x';
      break;
    default:
      return url;
  }
  return `${url.substring(0, url.lastIndexOf('.'))}${suffix}${url.substring(url.lastIndexOf('.'))}`;
}
