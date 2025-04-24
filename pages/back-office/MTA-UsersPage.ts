import { Page, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class MTAUsersPage {
  readonly Page: Page;

  readonly usersMenuLink: Locator;
  readonly systemUsersMenuLink: Locator;

  readonly userNameField: Locator;
  readonly fistNameField: Locator;
  readonly middleNameField: Locator;
  readonly lastNameField: Locator;

  readonly addNewRecordBttn: Locator;
  readonly searchButton: Locator;

  readonly searchByUsernameAndFullNameArr = [
    "mapatan@nacc.gov.ph",
    "MARIA CONCEPCION",
    "",
    "APATAN",
  ];

  readonly firstName = faker.person.firstName();
  readonly lastName = faker.person.lastName();
  readonly email = faker.internet.email();
  readonly password = faker.internet.password();

  constructor(page: Page) {
    this.Page = page;
    this.userNameField = page.locator("#txtUsernameMain");
    this.fistNameField = page.locator("#txtFirstNameMain");
    this.middleNameField = page.locator("#txtMiddleNameMain");
    this.lastNameField = page.locator("#txtLastNameMain");

    this.searchButton = page.locator(
      'xpath=//*[@id="kt_app_content"]/div[1]/div[3]/div[1]/div[2]/div[3]/div/button'
    );

    this.addNewRecordBttn = page.getByRole("button", {
      name: "   Add New Record",
    });
  }

  async searchSystemUserByUsernameAndFullName() {
    console.log("MTA SYSTEM USERS SEARCH BY USER NAME AND FULL NAME");

    await this.Page.locator("span", { hasText: "Users" }).first().click();
    await this.Page.getByRole("link", { name: "System Users" }).waitFor({
      state: "visible",
    });
    await this.Page.getByRole("link", { name: "System Users" }).click();

    await this.userNameField.fill(this.searchByUsernameAndFullNameArr[0]);
    await this.fistNameField.fill(this.searchByUsernameAndFullNameArr[1]);
    await this.middleNameField.fill(this.searchByUsernameAndFullNameArr[2]);
    await this.lastNameField.fill(this.searchByUsernameAndFullNameArr[3]);

    await this.searchButton.click();
  }

  async searchSystemUserByRegion() {
    console.log("MTA SYSTEM USERS SEARCH BY ASSIGNED REGION");
    await this.Page.locator("span")
      .filter({ hasText: "Users" })
      .first()
      .click();
    await this.Page.getByRole("link", { name: "System Users" }).click();
    await this.Page.getByRole("combobox", { name: "All Region" }).click();
    await this.Page.getByRole("option", {
      name: "REGION III (CENTRAL LUZON)",
    }).click();
    await this.Page.getByRole("button", { name: "   Search" }).click();
  }

  async searchSystemUserBySystemRoles() {
    console.log("MTA SYSTEM USERS SEARCH BY SYSTEM ROLES");
    await this.Page.locator("span")
      .filter({ hasText: "Users" })
      .first()
      .click();

    await this.Page.getByRole("link", { name: "System Users" }).click();
    await this.Page.getByRole("combobox", { name: "All Roles" }).click();
    await this.Page.getByRole("option", { name: "ADMIN" }).click();

    await this.Page.getByRole("button", { name: "   Search" }).click();
  }

  async addNewRecordAccount() {
    await this.Page.locator("span")
      .filter({ hasText: "Users" })
      .first()
      .click();

    await this.Page.getByRole("link", { name: "System Users" }).click();

    await this.addNewRecordBttn.click();

    //role
    await this.Page.getByRole("checkbox", { name: "BIPersonnel" }).check();
    await this.Page.getByRole("checkbox", { name: "admin" }).check();
    await this.Page.getByRole("checkbox", { name: "NACC" }).check();

    await this.Page.getByRole("button", { name: "Continue" });

    //assign region
    await this.Page.getByRole("checkbox", {
      name: "REGION II (CAGAYAN VALLEY)",
    }).check();
    await this.Page.getByRole("checkbox", {
      name: "REGION III (CENTRAL LUZON)",
    }).check();
    await this.Page.getByRole("checkbox", {
      name: "REGION I (ILOCOS REGION)",
    }).check();

    await this.Page.getByRole("button", { name: "Continue" });

    //user info
    await this.Page.getByRole("textbox", { name: "First Name*" }).fill(
      this.firstName
    );
    await this.Page.getByRole("textbox", { name: "Last Name*" }).fill(
      this.lastName
    );
    await this.Page.getByRole("textbox", { name: "Email*" }).fill(this.email);

    await this.Page.getByRole("button", { name: "Continue" });
    //set password
    await this.Page.locator("#txtPassword").fill(this.password);
    await this.Page.getByRole("button", { name: "Continue" });

    await this.Page.getByRole("button", { name: "Submit" });

    await this.Page.getByText("System user successfuly added!").isVisible();
  }
}
