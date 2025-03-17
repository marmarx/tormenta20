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

const removeAccents = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, '')

export {objectMap, boldify, unboldify, removeAccents}