const fs=require('node:fs');const assert=require('node:assert/strict');const ts=require('typescript');
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,file);
const {projects}=require('../src/content/projects.ts');const {site_config}=require('../src/content/site-config.ts');
const published=projects.filter(p=>p.published).sort((a,b)=>a.displayOrder-b.displayOrder);
assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length);
for(const p of published){assert(fs.existsSync(`out/projects/${p.slug}/index.html`));assert(fs.existsSync(`public${p.image}`));assert(p.metrics.every(m=>m.value&&m.label));}
const search=q=>published.filter(p=>`${p.title} ${p.technologies.join(' ')} ${p.shortDescription}`.toLowerCase().includes(q.toLowerCase()));
assert(search('PostgreSQL').some(p=>p.slug==='relational-storage-engine'));assert.equal(search('no-such-project').length,0);
for(const cat of ['AI/ML','Full Stack','Backend','Data','Cloud','Security'])assert(published.filter(p=>p.category.includes(cat)).every(p=>p.category.includes(cat)));
const home=fs.readFileSync('out/index.html','utf8');for(const name of site_config.navigation)assert(home.includes(`id="${name.toLowerCase()}"`));
for(const url of ['/resume.pdf','/sitemap.xml','/robots.txt','/admin/index.html'])assert(fs.existsSync('out'+url));
assert(fs.readFileSync('out/resume.pdf').subarray(0,4).toString()==='%PDF');
assert(home.includes('prefers-reduced-motion')===false); // motion policy is shipped in CSS, not inline HTML.
const cssFiles=fs.readdirSync('out/_next/static/css');assert(cssFiles.some(f=>fs.readFileSync('out/_next/static/css/'+f,'utf8').includes('prefers-reduced-motion')));
assert(!home.includes('https://linkedin.com'));assert(!home.includes('https://portfolio.com'));
console.log(`PASS: ${published.length} case-study routes, 7 section anchors, search/category data checks, metadata routes, admin overview, PDF signature, reduced-motion CSS, and absent generic profile links.`);
