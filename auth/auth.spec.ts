import { test, expect } from "@playwright/test";
import path from "path";

test('MTA Login Session', async ({ page }) => {
    

    const url = 'https://mta-admin-staging.dswd.gov.ph/'
    const emailAddress = 'jmacereno2@dswd.gov.ph'
    const passwordAccount = 'Qwerty@1234'

    console.log("URL: ", url);
    await page.goto(url);
    
    await page.getByRole('textbox', { name: 'Email' }).fill(emailAddress);
    await page.getByRole('textbox', { name: 'Password' }).fill(passwordAccount);
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    await expect(page).toHaveURL(/.*\/Dashboard*/);

    // Save storage state to a file
   
    await page.context().storageState({ path: path.resolve(__dirname, 'auth/auth.json') });
});