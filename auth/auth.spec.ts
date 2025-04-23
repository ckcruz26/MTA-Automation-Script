import { test, expect } from "@playwright/test";


test('MTA Login Session', async ({ page }) => {
    

    const url = 'https://mta-admin-staging.dswd.gov.ph/'
    const emailAddress = 'jmacereno2@dswd.gov.ph'
    const passwordAccount = 'Qwerty@1234'

    console.log("URL: ", url);
    await page.goto(url);
    
    await page.getByRole('textbox', { name: 'Email' }).fill(emailAddress);
    await page.getByRole('textbox', { name: 'Password' }).fill(passwordAccount);
    await page.getByRole('button', { name: 'Sign In' }).click();
    

    // Save storage state to a file
    await page.context().storageState({ path: "auth.json" });

});