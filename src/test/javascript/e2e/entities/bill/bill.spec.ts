/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BillComponentsPage, BillDeleteDialog, BillUpdatePage } from './bill.page-object';

const expect = chai.expect;

describe('Bill e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let billUpdatePage: BillUpdatePage;
  let billComponentsPage: BillComponentsPage;
  let billDeleteDialog: BillDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Bills', async () => {
    await navBarPage.goToEntity('bill');
    billComponentsPage = new BillComponentsPage();
    await browser.wait(ec.visibilityOf(billComponentsPage.title), 5000);
    expect(await billComponentsPage.getTitle()).to.eq('campacksysApp.bill.home.title');
  });

  it('should load create Bill page', async () => {
    await billComponentsPage.clickOnCreateButton();
    billUpdatePage = new BillUpdatePage();
    expect(await billUpdatePage.getPageTitle()).to.eq('campacksysApp.bill.home.createOrEditLabel');
    await billUpdatePage.cancel();
  });

  it('should create and save Bills', async () => {
    const nbButtonsBeforeCreate = await billComponentsPage.countDeleteButtons();

    await billComponentsPage.clickOnCreateButton();
    await promise.all([
      billUpdatePage.setDueDateInput('2000-12-31'),
      billUpdatePage.setDueAmountInput('5'),
      billUpdatePage.stateSelectLastOption(),
      billUpdatePage.paymentSelectLastOption()
    ]);
    expect(await billUpdatePage.getDueDateInput()).to.eq('2000-12-31', 'Expected dueDate value to be equals to 2000-12-31');
    expect(await billUpdatePage.getDueAmountInput()).to.eq('5', 'Expected dueAmount value to be equals to 5');
    await billUpdatePage.save();
    expect(await billUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await billComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Bill', async () => {
    const nbButtonsBeforeDelete = await billComponentsPage.countDeleteButtons();
    await billComponentsPage.clickOnLastDeleteButton();

    billDeleteDialog = new BillDeleteDialog();
    expect(await billDeleteDialog.getDialogTitle()).to.eq('campacksysApp.bill.delete.question');
    await billDeleteDialog.clickOnConfirmButton();

    expect(await billComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
