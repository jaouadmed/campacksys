import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class OrderStockComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-order-stock div table .btn-danger'));
  title = element.all(by.css('jhi-order-stock div h2#page-heading span')).first();

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

export class OrderStockUpdatePage {
  pageTitle = element(by.id('jhi-order-stock-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateInput = element(by.id('field_date'));
  quantityInput = element(by.id('field_quantity'));
  stateSelect = element(by.id('field_state'));
  alertSelect = element(by.id('field_alert'));
  supplierSelect = element(by.id('field_supplier'));
  employeeSelect = element(by.id('field_employee'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return await this.quantityInput.getAttribute('value');
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

  async alertSelectLastOption(timeout?: number) {
    await this.alertSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async alertSelectOption(option) {
    await this.alertSelect.sendKeys(option);
  }

  getAlertSelect(): ElementFinder {
    return this.alertSelect;
  }

  async getAlertSelectedOption() {
    return await this.alertSelect.element(by.css('option:checked')).getText();
  }

  async supplierSelectLastOption(timeout?: number) {
    await this.supplierSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async supplierSelectOption(option) {
    await this.supplierSelect.sendKeys(option);
  }

  getSupplierSelect(): ElementFinder {
    return this.supplierSelect;
  }

  async getSupplierSelectedOption() {
    return await this.supplierSelect.element(by.css('option:checked')).getText();
  }

  async employeeSelectLastOption(timeout?: number) {
    await this.employeeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async employeeSelectOption(option) {
    await this.employeeSelect.sendKeys(option);
  }

  getEmployeeSelect(): ElementFinder {
    return this.employeeSelect;
  }

  async getEmployeeSelectedOption() {
    return await this.employeeSelect.element(by.css('option:checked')).getText();
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

export class OrderStockDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-orderStock-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-orderStock'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
