/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UnitComponentsPage, UnitDeleteDialog, UnitUpdatePage } from './unit.page-object';

const expect = chai.expect;

describe('Unit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let unitUpdatePage: UnitUpdatePage;
  let unitComponentsPage: UnitComponentsPage;
  let unitDeleteDialog: UnitDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Units', async () => {
    await navBarPage.goToEntity('unit');
    unitComponentsPage = new UnitComponentsPage();
    await browser.wait(ec.visibilityOf(unitComponentsPage.title), 5000);
    expect(await unitComponentsPage.getTitle()).to.eq('campacksysApp.unit.home.title');
  });

  it('should load create Unit page', async () => {
    await unitComponentsPage.clickOnCreateButton();
    unitUpdatePage = new UnitUpdatePage();
    expect(await unitUpdatePage.getPageTitle()).to.eq('campacksysApp.unit.home.createOrEditLabel');
    await unitUpdatePage.cancel();
  });

  it('should create and save Units', async () => {
    const nbButtonsBeforeCreate = await unitComponentsPage.countDeleteButtons();

    await unitComponentsPage.clickOnCreateButton();
    await promise.all([unitUpdatePage.setUnitInput('unit'), unitUpdatePage.setDescriptionInput('description')]);
    expect(await unitUpdatePage.getUnitInput()).to.eq('unit', 'Expected Unit value to be equals to unit');
    expect(await unitUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    await unitUpdatePage.save();
    expect(await unitUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await unitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Unit', async () => {
    const nbButtonsBeforeDelete = await unitComponentsPage.countDeleteButtons();
    await unitComponentsPage.clickOnLastDeleteButton();

    unitDeleteDialog = new UnitDeleteDialog();
    expect(await unitDeleteDialog.getDialogTitle()).to.eq('campacksysApp.unit.delete.question');
    await unitDeleteDialog.clickOnConfirmButton();

    expect(await unitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
