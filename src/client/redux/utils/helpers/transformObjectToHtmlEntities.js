// import { AllHtmlEntities }                from 'html-entities';

// const transformer = new AllHtmlEntities();

export default function transformObjectToHtmlEntities(convertObj) {
  const convertedObj = convertObj;

  for (const property in convertedObj) {
    if (convertedObj.hasOwnProperty(property)) {
      if (typeof (convertedObj[property]) === 'object') {
        transformObjectToHtmlEntities(convertedObj[property]);
      }
      if (typeof (convertObj[property]) === 'string' && property !== 'link') {
        convertedObj[property] = encodeStringWithHtmlEntities(convertObj[property]);
      }
    }
  }
  return convertObj;
}


export function encodeStringWithHtmlEntities(string) {
  return encodeURIComponent(string);
}
