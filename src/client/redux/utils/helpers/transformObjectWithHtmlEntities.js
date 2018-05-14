import { AllHtmlEntities }                from 'html-entities';

const transformer = new AllHtmlEntities();

export function transformObjectWithHtmlEntities(convertObj) {
  const convertedObj = convertObj;

  for (const property in convertedObj) {
    if (convertedObj.hasOwnProperty(property)) {
      if (typeof (convertedObj[property]) === 'object') {
        transformObjectWithHtmlEntities(convertedObj[property]);
      }
      if (typeof (convertObj[property]) === 'string' && property !== 'link' && property !== 'image') {
        convertedObj[property] = decodeStringWithHtmlEntities(convertObj[property]);
      }
    }
  }
  return convertObj;
}


export function decodeStringWithHtmlEntities(string) {
  try {
    return decodeURIComponent(transformer.decode(string));
  }  catch (e) {
    return transformer.decode(string);
  }
}
