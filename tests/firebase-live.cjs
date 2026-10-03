// Manual smoke test: makes ONE real Gemini request on the production origin.
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch();const page=await browser.newPage({reducedMotion:'reduce'});
 const root=process.cwd(),base='https://roslinkenne.github.io/portfolio/';const observations=[];
 page.on('response',async response=>{const url=new URL(response.url());if(/firebaseappcheck|firebasevertexai|firebaseai/.test(url.hostname)){const item={host:url.hostname,status:response.status()};if(response.status()>=400)item.error=(await response.text()).slice(0,2000);observations.push(item)}});
 page.on('pageerror',error=>observations.push({pageError:error.message}));
 await page.route(base+'**',async route=>{let relative=decodeURIComponent(new URL(route.request().url()).pathname.slice('/portfolio/'.length))||'index.html';const file=path.resolve(root,relative);if(!file.startsWith(root+path.sep)){await route.abort();return;}if(fs.existsSync(file)&&fs.statSync(file).isFile())await route.fulfill({path:file});else await route.continue()});
 try{await page.goto(base);await page.locator('#agent-launcher').click();await page.locator('[data-agent="projects"]').click();await page.waitForFunction(()=>!document.querySelector('#agent-form').hasAttribute('aria-busy'),{},{timeout:90000});console.log(JSON.stringify({answer:await page.locator('.agent-message').last().innerText(),observations},null,2));if(await page.locator('.agent-error').count()||observations.some(item=>item.status>=400||item.pageError))process.exitCode=1;}
 finally{await browser.close()}
})().catch(error=>{console.error(error.message);process.exitCode=1});
