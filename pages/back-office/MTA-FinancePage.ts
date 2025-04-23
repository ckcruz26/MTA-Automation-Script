import { Page, Locator, expect } from "@playwright/test";

export class MTAFinancePage {
  readonly Page: Page;
  readonly financeDownloadExcelButton: Locator;

  readonly firstNameInputSearch: Locator;
  readonly middleNameInputSearch: Locator;
  readonly lastNameInputSearch: Locator;

  readonly applicationTypeDropdown: Locator;
  readonly paymentGateWay: Locator;

  readonly startDate: Locator;
  readonly endDate: Locator;

  readonly financeSearchButton: Locator;

  constructor(page: Page) {
    this.Page = page;
    this.financeDownloadExcelButton = page.locator(
      'xpath=//*[@id="divContent"]/div/div[1]/div[2]/button'
    );
    this.financeSearchButton = page.getByRole("button", { name: "   Search" });

    // full name
    this.firstNameInputSearch = page.locator("#txtFirstNameMain");
    this.middleNameInputSearch = page.locator("#txtMiddleNameMain");
    this.lastNameInputSearch = page.locator("#txtLastNameMain");

    //application type
    this.applicationTypeDropdown = page.locator("#ddlApplicationType");

    //payment gateway
    this.paymentGateWay = page.locator("#ddlPaymentGateWay");

    //start and end date 
    this.startDate = page.locator('#txtDateStart')
    this.endDate = page.locator('#txtDateEnd')

  }

  async clickDownloadExcelButton() {
    console.log("MTA FINANCE DOWNLOAD EXCEL FILE");
    await this.Page.getByRole("link", { name: "Finance" }).waitFor({
      state: "visible",
    });
    await this.Page.getByRole("link", { name: "Finance" }).click();
    await this.financeDownloadExcelButton.waitFor({ state: "visible" }); // ensure it's visible
    await this.financeDownloadExcelButton.click();
  }

  async searchByFullName(
    firstName: string,
    middleName: string,
    lastName: string
  ) {
    console.log("MTA FINANCE SEARCH BY FULL NAME");
    await this.Page.getByRole("link", { name: "Finance" }).waitFor({
      state: "visible",
    });
    await this.Page.getByRole("link", { name: "Finance" }).click();
    await this.firstNameInputSearch.waitFor({ state: "visible" });
    await this.middleNameInputSearch.waitFor({ state: "visible" });
    await this.lastNameInputSearch.waitFor({ state: "visible" });

    await this.firstNameInputSearch.fill(firstName);
    await this.middleNameInputSearch.fill(middleName);
    await this.lastNameInputSearch.fill(lastName);

    await this.financeSearchButton.waitFor({ state: "visible" });
    await this.financeSearchButton.click();

    await this.Page.waitForTimeout(1000);
  }

  async searchByApplicationType() {
    console.log("MTA FINANCE SEARCH BY APPLICATION TYPE");
    await this.Page.getByRole("link", { name: "Finance" }).waitFor({
      state: "visible",
    });
    await this.Page.getByRole("link", { name: "Finance" }).click();

    await this.applicationTypeDropdown.waitFor({ state: "visible" });
    await this.applicationTypeDropdown.click();
    await this.applicationTypeDropdown.selectOption("1");

    await this.financeSearchButton.waitFor({ state: "visible" });
    await this.financeSearchButton.click();
  }

  async searchByPaymentGateway() {
    console.log("MTA FINANCE SEARCH BY PAYMENT GATEWAY");
    await this.Page.getByRole("link", { name: "Finance" }).waitFor({
      state: "visible",
    });
    await this.Page.getByRole("link", { name: "Finance" }).click();

    await this.paymentGateWay.waitFor({ state: "visible" });
    await this.paymentGateWay.click();
    await this.paymentGateWay.selectOption("1002");

    await this.financeSearchButton.waitFor({ state: "visible" });
    await this.financeSearchButton.click();
  }

  async searchByDateFromAndDateTo() {
    await this.Page.getByRole("link", { name: "Finance" }).waitFor({
      state: "visible",
    });
    await this.Page.getByRole("link", { name: "Finance" }).click();
    await this.startDate.waitFor({state : "visible"})
    // await this.startDate.focus();
    // await this.startDate.fill('12/16/2024')
    // await this.startDate.press('Escape');
    // await this.endDate.waitFor({state : "visible"})
    // await this.endDate.focus();
    // await this.endDate.fill('12/17/2024')
    // await this.endDate.press('Escape');


    await this.startDate.click();
    await this.Page.getByRole('combobox').nth(2).selectOption('11');
    await this.Page.getByRole('cell', { name: '16' }).click();
    await this.endDate.click();
    await this.Page.getByRole('combobox').nth(2).selectOption('11');
    await this.Page.getByRole('combobox').nth(3).selectOption('2024');
    await this.Page.getByRole('cell', { name: '17' }).click();

    await this.financeSearchButton.waitFor({ state: "visible" });
    await this.financeSearchButton.click();

    await  this.Page.waitForTimeout(5000)
  }
}
