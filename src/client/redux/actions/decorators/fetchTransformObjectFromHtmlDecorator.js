import { transformObjectWithHtmlEntities }  from '../../utils/helpers';

export default function () {
  return this
    .then(value => {
      return transformObjectWithHtmlEntities(value);
    });
}
