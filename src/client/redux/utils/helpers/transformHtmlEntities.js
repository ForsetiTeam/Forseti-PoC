import { AllHtmlEntities }                from 'html-entities';
import striptags                          from 'striptags';

const transformer = new AllHtmlEntities();

export default function (string) {
  return decodeURIComponent(transformer.decode(striptags(string)));
}
