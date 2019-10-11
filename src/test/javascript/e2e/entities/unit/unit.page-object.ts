import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class UnitComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-unit div table .btn-danger'));
  title = element.all(by.css('jhi-unit div h2#page-heading span')).first();

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

export class UnitUpdatePage {
  pageTitle = element(by.id('jhi-unit-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  unitInput = element(by.id('field_unit'));
  descriptionInput = element(by.id('field_description'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUnitInput(unit) {
    await this.unitInput.sendKeys(unit);
  }

  async getUnitInput() {
    return await this.unitInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
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

export class UnitDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-unit-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-unit'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
