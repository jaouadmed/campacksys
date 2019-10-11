/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DiscountComponentsPage, DiscountDeleteDialog, DiscountUpdatePage } from './discount.page-object';

const expect = chai.expect;

describe('Discount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let discountUpdatePage: DiscountUpdatePage;
  let discountComponentsPage: DiscountComponentsPage;
  let discountDeleteDialog: DiscountDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Discounts', async () => {
    await navBarPage.goToEntity('discount');
    discountComponentsPage = new DiscountComponentsPage();
    await browser.wait(ec.visibilityOf(discountComponentsPage.title), 5000);
    expect(await discountComponentsPage.getTitle()).to.eq('campacksysApp.discount.home.title');
  });

  it('should load create Discount page', async () => {
    await discountComponentsPage.clickOnCreateButton();
    discountUpdatePage = new DiscountUpdatePage();
    expect(await discountUpdatePage.getPageTitle()).to.eq('campacksysApp.discount.home.createOrEditLabel');
    await discountUpdatePage.cancel();
  });

  it('should create and save Discounts', async () => {
    const nbButtonsBeforeCreate = await discountComponentsPage.countDeleteButtons();

    await discountComponentsPage.clickOnCreateButton();
    await promise.all([discountUpdatePage.natureSelectLastOption(), discountUpdatePage.setAmountInput('5')]);
    expect(await discountUpdatePage.getAmountInput()).to.eq('5', 'Expected amount value to be equals to 5');
    await discountUpdatePage.save();
    expect(await discountUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await discountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Discount', async () => {
    const nbButtonsBeforeDelete = await discountComponentsPage.countDeleteButtons();
    await discountComponentsPage.clickOnLastDeleteButton();

    discountDeleteDialog = new DiscountDeleteDialog();
    expect(await discountDeleteDialog.getDialogTitle()).to.eq('campacksysApp.discount.delete.question');
    await discountDeleteDialog.clickOnConfirmButton();

    expect(await discountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
