/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SupplierComponentsPage, SupplierDeleteDialog, SupplierUpdatePage } from './supplier.page-object';

const expect = chai.expect;

describe('Supplier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let supplierUpdatePage: SupplierUpdatePage;
  let supplierComponentsPage: SupplierComponentsPage;
  let supplierDeleteDialog: SupplierDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Suppliers', async () => {
    await navBarPage.goToEntity('supplier');
    supplierComponentsPage = new SupplierComponentsPage();
    await browser.wait(ec.visibilityOf(supplierComponentsPage.title), 5000);
    expect(await supplierComponentsPage.getTitle()).to.eq('campacksysApp.supplier.home.title');
  });

  it('should load create Supplier page', async () => {
    await supplierComponentsPage.clickOnCreateButton();
    supplierUpdatePage = new SupplierUpdatePage();
    expect(await supplierUpdatePage.getPageTitle()).to.eq('campacksysApp.supplier.home.createOrEditLabel');
    await supplierUpdatePage.cancel();
  });

  it('should create and save Suppliers', async () => {
    const nbButtonsBeforeCreate = await supplierComponentsPage.countDeleteButtons();

    await supplierComponentsPage.clickOnCreateButton();
    await promise.all([
      supplierUpdatePage.setNameInput('name'),
      supplierUpdatePage.setAddressInput('address'),
      supplierUpdatePage.setEmailInput('email'),
      supplierUpdatePage.setPhoneNumberInput('phoneNumber')
    ]);
    expect(await supplierUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await supplierUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await supplierUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await supplierUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
    await supplierUpdatePage.save();
    expect(await supplierUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await supplierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Supplier', async () => {
    const nbButtonsBeforeDelete = await supplierComponentsPage.countDeleteButtons();
    await supplierComponentsPage.clickOnLastDeleteButton();

    supplierDeleteDialog = new SupplierDeleteDialog();
    expect(await supplierDeleteDialog.getDialogTitle()).to.eq('campacksysApp.supplier.delete.question');
    await supplierDeleteDialog.clickOnConfirmButton();

    expect(await supplierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
