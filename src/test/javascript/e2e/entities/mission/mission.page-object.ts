import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MissionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-mission div table .btn-danger'));
  title = element.all(by.css('jhi-mission div h2#page-heading span')).first();

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

export class MissionUpdatePage {
  pageTitle = element(by.id('jhi-mission-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  creationDateInput = element(by.id('field_creationDate'));
  nbrDaysInput = element(by.id('field_nbrDays'));
  startDateInput = element(by.id('field_startDate'));
  stateSelect = element(by.id('field_state'));
  teamSelect = element(by.id('field_team'));
  clientSelect = element(by.id('field_client'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCreationDateInput(creationDate) {
    await this.creationDateInput.sendKeys(creationDate);
  }

  async getCreationDateInput() {
    return await this.creationDateInput.getAttribute('value');
  }

  async setNbrDaysInput(nbrDays) {
    await this.nbrDaysInput.sendKeys(nbrDays);
  }

  async getNbrDaysInput() {
    return await this.nbrDaysInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return await this.startDateInput.getAttribute('value');
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

  async teamSelectLastOption(timeout?: number) {
    await this.teamSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async teamSelectOption(option) {
    await this.teamSelect.sendKeys(option);
  }

  getTeamSelect(): ElementFinder {
    return this.teamSelect;
  }

  async getTeamSelectedOption() {
    return await this.teamSelect.element(by.css('option:checked')).getText();
  }

  async clientSelectLastOption(timeout?: number) {
    await this.clientSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clientSelectOption(option) {
    await this.clientSelect.sendKeys(option);
  }

  getClientSelect(): ElementFinder {
    return this.clientSelect;
  }

  async getClientSelectedOption() {
    return await this.clientSelect.element(by.css('option:checked')).getText();
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

export class MissionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mission-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mission'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
