//general utility functions
const uuidv4 = () => "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16))
const objectMap = (obj,fn) => Object.fromEntries(Object.entries(obj).map(([k,v],i) => [k,fn(v,k,i)]))   //value, key, index; original obj is unchanged

//richtext from input
const boldify = str => {
  let indexes = [...str.matchAll(/_/g)].map(match => match.index);
  for(let i=indexes.length-1;i>-1;i--){
   if(i%2==0){str = str.substring(0,indexes[i]) + '<i>' + str.substring(indexes[i]+1)}
   else{str = str.substring(0,indexes[i]) + '</i>' + str.substring(indexes[i]+1)}
  }
  indexes = [...str.matchAll(/\*/g)].map(match => match.index);
  for(let i=indexes.length-1;i>-1;i--){
   if(i%2==0){str = str.substring(0,indexes[i]) + '<b>' + str.substring(indexes[i]+1)}
   else{str = str.substring(0,indexes[i]) + '</b>' + str.substring(indexes[i]+1)}
  }
  return str.replaceAll('</table>\n','</table><p class="nowrap ms">').replaceAll('\n','<br>');
}
const unboldify = str => isNaN(str)?str.replaceAll(/<br>|<\/br>/gi,'\n').replaceAll(/<i>|<\/i>/gi,'_').replaceAll(/<b>|<\/b>/gi,'*').replaceAll(/<\/?p[^>]*>/gi,'\n'):str

//text manipulation
const removeAccents = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, '')
const toSentenceCase = str => str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()

export {objectMap, boldify, unboldify, removeAccents, toSentenceCase, uuidv4}