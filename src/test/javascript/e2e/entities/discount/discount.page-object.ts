import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class DiscountComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-discount div table .btn-danger'));
  title = element.all(by.css('jhi-discount div h2#page-heading span')).first();

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

export class DiscountUpdatePage {
  pageTitle = element(by.id('jhi-discount-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  natureSelect = element(by.id('field_nature'));
  amountInput = element(by.id('field_amount'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNatureSelect(nature) {
    await this.natureSelect.sendKeys(nature);
  }

  async getNatureSelect() {
    return await this.natureSelect.element(by.css('option:checked')).getText();
  }

  async natureSelectLastOption(timeout?: number) {
    await this.natureSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return await this.amountInput.getAttribute('value');
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

export class DiscountDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-discount-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-discount'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
