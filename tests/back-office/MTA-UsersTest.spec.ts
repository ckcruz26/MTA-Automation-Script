import { test } from "@playwright/test";
import { MTAUsersPage } from "../../pages/back-office/MTA-UsersPage";

import path from "path";
test.describe("MTA USERS TEST ", () => {
  test.use({
    storageState: path.resolve(__dirname, "../../auth/auth.json"),
  });

  test.beforeEach(async ({ page }) => {
    // Go to login page
    await page.goto("https://mta-admin-staging.dswd.gov.ph/");
  });

  test.afterEach(async ({ page }) => {
    await page.close(); // closes the current page after each test
  });

  test("MTA USERS (SYS USERS) - 001 ", async ({ page }) => {
    const usersModule = new MTAUsersPage(page);
    usersModule.searchSystemUserByUsernameAndFullName();
  });

  test("MTA USERS (SYS USERS) - 002", async ({ page }) => {
    const usersModule = new MTAUsersPage(page);
    usersModule.searchSystemUserByRegion();
  });

  test("MTA USERS (SYS USERS - 003", async ({ page }) => {
    const usersModule = new MTAUsersPage(page);
    usersModule.searchSystemUserBySystemRoles();
  });

  test("MTA USERS (SYS USERS - 004", async ({ page }) => {
    const usersModule = new MTAUsersPage(page);
    usersModule.addNewRecordAccount();
  });
});
