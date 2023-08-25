import _ from "lodash";
const postRequestData = [{key1: 'value1'}]
const postData1 = [{key2: 'value2', key1: 'keyChanged'}]
const postData = _.merge(undefined, undefined);

console.log('GAJENDRA', JSON.stringify(postData))