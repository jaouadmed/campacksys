import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class DurationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-duration div table .btn-danger'));
  title = element.all(by.css('jhi-duration div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class DurationUpdatePage {
  pageTitle = element(by.id('jhi-duration-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateFromInput = element(by.id('field_dateFrom'));
  dateToInput = element(by.id('field_dateTo'));
  missionSelect = element(by.id('field_mission'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateFromInput(dateFrom) {
    await this.dateFromInput.sendKeys(dateFrom);
  }

  async getDateFromInput() {
    return await this.dateFromInput.getAttribute('value');
  }

  async setDateToInput(dateTo) {
    await this.dateToInput.sendKeys(dateTo);
  }

  async getDateToInput() {
    return await this.dateToInput.getAttribute('value');
  }

  async missionSelectLastOption(timeout?: number) {
    await this.missionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async missionSelectOption(option) {
    await this.missionSelect.sendKeys(option);
  }

  getMissionSelect(): ElementFinder {
    return this.missionSelect;
  }

  async getMissionSelectedOption() {
    return await this.missionSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class DurationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-duration-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-duration'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
