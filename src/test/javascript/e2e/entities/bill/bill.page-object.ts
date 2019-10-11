import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class BillComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-bill div table .btn-danger'));
  title = element.all(by.css('jhi-bill div h2#page-heading span')).first();

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

export class BillUpdatePage {
  pageTitle = element(by.id('jhi-bill-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dueDateInput = element(by.id('field_dueDate'));
  dueAmountInput = element(by.id('field_dueAmount'));
  stateSelect = element(by.id('field_state'));
  paymentSelect = element(by.id('field_payment'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDueDateInput(dueDate) {
    await this.dueDateInput.sendKeys(dueDate);
  }

  async getDueDateInput() {
    return await this.dueDateInput.getAttribute('value');
  }

  async setDueAmountInput(dueAmount) {
    await this.dueAmountInput.sendKeys(dueAmount);
  }

  async getDueAmountInput() {
    return await this.dueAmountInput.getAttribute('value');
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

  async paymentSelectLastOption(timeout?: number) {
    await this.paymentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async paymentSelectOption(option) {
    await this.paymentSelect.sendKeys(option);
  }

  getPaymentSelect(): ElementFinder {
    return this.paymentSelect;
  }

  async getPaymentSelectedOption() {
    return await this.paymentSelect.element(by.css('option:checked')).getText();
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

export class BillDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-bill-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-bill'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
