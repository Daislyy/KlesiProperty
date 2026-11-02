import bcrypt from 'bcrypt';

const password = process.argv[2] || 'admin123';

const hash = await bcrypt.hash(password, 10);

console.log(`\nPassword  : ${password}`);
console.log(`Hash      : ${hash}`);
console.log(`\nJalankan SQL ini di MySQL:`);
console.log(`UPDATE users SET password = '${hash}' WHERE email = 'admin@padly.com';\n`);
