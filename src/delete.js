const logsEnabled = [
    'info'
]
const valueToCheck1 = 'info';
if(logsEnabled.includes['info'])
    console.log('Found')


const logsEnabled1 = ['info'];
const valueToCheck = 'info';

if (logsEnabled1.includes(valueToCheck)) {
    console.log(`${valueToCheck} exists in the array.`);
} else {
    console.log(`${valueToCheck} does not exist in the array.`);
}