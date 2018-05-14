import { transformObjectWithHtmlEntities } from './transformObjectWithHtmlEntities';

export default function (array) {
  return array.map((value) => {
    return transformObjectWithHtmlEntities(value);
  });
}
