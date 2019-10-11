import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AlertComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-alert div table .btn-danger'));
  title = element.all(by.css('jhi-alert div h2#page-heading span')).first();

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

export class AlertUpdatePage {
  pageTitle = element(by.id('jhi-alert-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateInput = element(by.id('field_date'));
  stateSelect = element(by.id('field_state'));
  stockSelect = element(by.id('field_stock'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async setStateSelect(state) {
    await this.stateSelect.sendKeys(state);
  }

  async getStateSelect() {
    return await this.stateSelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption(timeout?: number) {
    await this.stateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async stockSelectLastOption(timeout?: number) {
    await this.stockSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async stockSelectOption(option) {
    await this.stockSelect.sendKeys(option);
  }

  getStockSelect(): ElementFinder {
    return this.stockSelect;
  }

  async getStockSelectedOption() {
    return await this.stockSelect.element(by.css('option:checked')).getText();
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

export class AlertDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-alert-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-alert'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
