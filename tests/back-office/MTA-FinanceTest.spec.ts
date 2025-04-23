import { test, expect } from "@playwright/test";
import { MTAFinancePage } from "../../pages/back-office/MTA-FinancePage";


test.describe("MTA Finance Test", () => {

  const url = 'https://mta-admin-staging.dswd.gov.ph/';
  const emailAddress = 'jmacereno2@dswd.gov.ph';
  const passwordAccount = 'Qwerty@1234';
  
  test.beforeEach(async ({ page }) => {
    // Go to login page
    await page.goto(url);
  
    // Fill in credentials and log in
    await page.getByRole('textbox', { name: 'Email' }).fill(emailAddress);
    await page.getByRole('textbox', { name: 'Password' }).fill(passwordAccount);
    await page.getByRole('button', { name: 'Sign In' }).click();
  
    // Optional: wait for redirect or successful login indicator
    await expect(page).toHaveURL(/.*\/Dashboard*/);

    // Then navigate to the finance module
  });

  test.afterEach(async ({ page }) => {
    await page.close(); // closes the current page after each test
  });

  test("MTA-FINANCE-001", async ({ page }) => {
    const financeModule = new MTAFinancePage(page);
    await financeModule.clickDownloadExcelButton();
  });

  test("MTA-FINANCE-002", async ({ page }) => {
    const financeModule = new MTAFinancePage(page);
    await financeModule.searchByFullName("Jeanalyn", "Arevalo", "Fabila");
    
  });

  test('MTA-FINANCE-003', async ({page }) => {
    const financeModule = new MTAFinancePage(page)
    await financeModule.searchByApplicationType();
  })

  test('MTA-FINANCE-004', async ({page}) => {
    const financeModule = new MTAFinancePage(page)
    await financeModule.searchByPaymentGateway();
  })

  test('MTA-FINANCE-005', async ({page}) => {
    const financeModule = new MTAFinancePage(page)
    await financeModule.searchByDateFromAndDateTo()
  })
});
