import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class StockComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-stock div table .btn-danger'));
  title = element.all(by.css('jhi-stock div h2#page-heading span')).first();

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

export class StockUpdatePage {
  pageTitle = element(by.id('jhi-stock-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  quantityInput = element(by.id('field_quantity'));
  alertLimitInput = element(by.id('field_alertLimit'));
  productSelect = element(by.id('field_product'));
  unitSelect = element(by.id('field_unit'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return await this.quantityInput.getAttribute('value');
  }

  async setAlertLimitInput(alertLimit) {
    await this.alertLimitInput.sendKeys(alertLimit);
  }

  async getAlertLimitInput() {
    return await this.alertLimitInput.getAttribute('value');
  }

  async productSelectLastOption(timeout?: number) {
    await this.productSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productSelectOption(option) {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect(): ElementFinder {
    return this.productSelect;
  }

  async getProductSelectedOption() {
    return await this.productSelect.element(by.css('option:checked')).getText();
  }

  async unitSelectLastOption(timeout?: number) {
    await this.unitSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async unitSelectOption(option) {
    await this.unitSelect.sendKeys(option);
  }

  getUnitSelect(): ElementFinder {
    return this.unitSelect;
  }

  async getUnitSelectedOption() {
    return await this.unitSelect.element(by.css('option:checked')).getText();
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

export class StockDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-stock-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-stock'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
