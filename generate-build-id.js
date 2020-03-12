const fs = require('fs');

let rawdata = fs.readFileSync('./package.json');
let student = JSON.parse(rawdata);
var version = student.version.split('.');
let newst = parseInt(version[2], 10) + 1
student.version = version[0]+'.'+version[1]+'.'+newst;

let data = JSON.stringify(student, null, 2);
fs.writeFileSync('package.json', data);
