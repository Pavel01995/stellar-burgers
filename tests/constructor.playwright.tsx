import {test,expect} from "@playwright/test";





test('проверка конструтора бургера', async({page})=>{
await page.routeFromHAR('test/hars/constructor.har,'{
update:false,
notFound:'fallback',
});


await page.goto('/');

});