// Keep the readable HTML, FAQ schema and project index aligned with shipped copy.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const literal = js.match(/const translations = (\{[\s\S]*?\n\});\s*\nclass I18nEngine/);
if (!literal) throw new Error('Translation dictionary not found');
const { en } = vm.runInNewContext(`(${literal[1]})`, Object.create(null), { timeout: 1000 });
const strip = value => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
html = html.replace(/<([a-z][\w-]*)([^>]*\bdata-i18n="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/gi,
  (original, tag, attributes, key) => en[key] ? `<${tag}${attributes}>${en[key]}</${tag}>` : original);
const projects = ['harmed','via-cairo','qurani','dragon','scope','volt'].map(slug => {
  const source = fs.readFileSync(path.join(root, 'work', `${slug}.html`), 'utf8');
  const name = source.match(/<h1>(.*?)<\/h1>/)[1];
  const description = source.match(/<meta name="description" content="([^"]+)"/)[1];
  return { name, description, url: `https://seif4d.com/work/${slug}.html` };
});
const schema = {
  '@context':'https://schema.org', '@graph':[
    { '@type':'Person','@id':'https://seif4d.com/#person',name:'Seif',alternateName:['SEIF4D','سيف'],url:'https://seif4d.com/',jobTitle:'Developer & Product Builder',image:'https://seif4d.com/assets/hero-portrait-v2.jpg' },
    { '@type':'WebSite','@id':'https://seif4d.com/#website',name:'SEIF4D',url:'https://seif4d.com/',inLanguage:['en','ar'],author:{'@id':'https://seif4d.com/#person'} },
    { '@type':'ItemList',name:'Selected work by SEIF4D',itemListElement:projects.map((project,i)=>({'@type':'ListItem',position:i+1,item:{'@type':'CreativeWork',...project}})) },
    { '@type':'FAQPage',mainEntity:[1,2,3,4,5].map(i=>({'@type':'Question',name:strip(en[`faq.q${i}`]),acceptedAnswer:{'@type':'Answer',text:strip(en[`faq.a${i}`])}})) }
  ]
};
html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${JSON.stringify(schema,null,2)}\n  </script>`);
fs.writeFileSync(path.join(root, 'index.html'), html);
const intro = '# SEIF4D — Developer & Product Builder\n\nSeif is a Cairo-based developer and product builder. This portfolio brings together web experiences, digital products and venture concepts.\n\nWebsite: https://seif4d.com/\nContact: contact@seif4d.com\nLanguages: Arabic and English\n\n## Selected work\n\n';
const index = projects.map(p=>`- [${p.name}](${p.url}): ${p.description}`).join('\n');
fs.writeFileSync(path.join(root,'llms.txt'), intro + index + '\n\nProject covers are AI-generated concept artwork, not product screenshots. See each project page for its status and available public links.\n');
fs.writeFileSync(path.join(root,'llms-full.txt'), intro + index + '\n\n## Working together\n\n' + [1,2,3,4,5].map(i=>`### ${strip(en[`faq.q${i}`])}\n${strip(en[`faq.a${i}`])}`).join('\n\n') + '\n');
console.log('Updated static copy, structured data and project summaries.');
