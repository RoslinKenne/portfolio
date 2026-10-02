const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const base=process.env.TEST_URL||'http://127.0.0.1:8011/portfolio/';
 const browser=await chromium.launch({headless:true});
 try {
  for(const width of [390,1280]) {
   const context=await browser.newContext({viewport:{width,height:900}});
   const page=await context.newPage();const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.route('https://fonts.googleapis.com/**',r=>r.abort());
   await page.goto(base,{waitUntil:'networkidle'});
   if(width<768) {
    await page.getByRole('button',{name:'Ouvrir le menu'}).click();
    assert.equal(await page.locator('#menuToggle').getAttribute('aria-expanded'),'true');
    await page.locator('#mobileNav a[href="#projects"]').click();
    assert.equal(await page.locator('#menuToggle').getAttribute('aria-expanded'),'false');
    await page.getByRole('button',{name:'Ouvrir le menu'}).click();await page.keyboard.press('Escape');
    assert.equal(await page.locator('#mobileNav').evaluate(el=>el.hidden),true);
   }
   assert.equal(await page.locator('body').evaluate(el=>el.scrollWidth<=window.innerWidth),true);
   const cv=await page.request.get(new URL('CV_stage_cyber_infonuagique_ATS.pdf',base).href);
   assert.equal(cv.status(),200);assert.equal((await cv.body()).subarray(0,4).toString(),'%PDF');
   for(const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(el=>el.decode());
    assert.equal(await image.evaluate(el=>el.naturalWidth>0),true);
   }
   await page.getByLabel('Nom',{exact:true}).fill('Test local');
   await page.getByLabel('Email',{exact:true}).fill('local@example.test');
   await page.getByLabel('Message',{exact:true}).fill('Validation locale sans envoi réel.');
   if(base.includes('8012') || process.env.TEST_PHP==='1') {
    await page.getByRole('button',{name:'Envoyer le message'}).click();
    await page.getByRole('status').waitFor();
    assert.match(await page.getByRole('status').innerText(),/temporairement indisponible/);
   } else {
    let submitted=false;
    await page.route('https://formspree.io/**',async route=>{
     assert.equal(route.request().method(),'POST');assert.match(route.request().postData(),/local%40example.test/);
     submitted=true;await route.fulfill({status:200,contentType:'text/html',body:'Envoi simulé localement'});
    });
    await page.getByRole('button',{name:'Envoyer le message'}).click();
    await page.waitForURL('https://formspree.io/**');assert.equal(submitted,true);
   }
   assert.deepEqual(errors,[]);
   await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
  const page=await context.newPage();await page.route('https://fonts.googleapis.com/**',r=>r.abort());
  await page.goto(base);
  assert.equal(await page.locator('.fade-in-up').first().evaluate(el=>getComputedStyle(el).opacity),'1');
  await page.getByRole('navigation',{name:'Navigation mobile sans JavaScript'}).getByRole('link',{name:'Projets'}).click();
  assert.match(page.url(),/#projects$/);await context.close();
  const reduced=await browser.newContext({reducedMotion:'reduce'});const rp=await reduced.newPage();
  await rp.route('https://fonts.googleapis.com/**',r=>r.abort());await rp.goto(base);
  assert.equal(await rp.locator('#typewriter').innerText(),'Passionné de cybersécurité');
  assert.equal(await rp.locator('.animate-entry').count(),0);
  if(process.env.SCREENSHOT){await rp.screenshot({path:process.env.SCREENSHOT,fullPage:true});}
  await reduced.close();
  console.log('Navigateur : mobile, desktop, menu, images, CV, contact, sans JS et réduction des mouvements OK');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
