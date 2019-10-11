/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AlertComponentsPage, AlertDeleteDialog, AlertUpdatePage } from './alert.page-object';

const expect = chai.expect;

describe('Alert e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let alertUpdatePage: AlertUpdatePage;
  let alertComponentsPage: AlertComponentsPage;
  let alertDeleteDialog: AlertDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Alerts', async () => {
    await navBarPage.goToEntity('alert');
    alertComponentsPage = new AlertComponentsPage();
    await browser.wait(ec.visibilityOf(alertComponentsPage.title), 5000);
    expect(await alertComponentsPage.getTitle()).to.eq('campacksysApp.alert.home.title');
  });

  it('should load create Alert page', async () => {
    await alertComponentsPage.clickOnCreateButton();
    alertUpdatePage = new AlertUpdatePage();
    expect(await alertUpdatePage.getPageTitle()).to.eq('campacksysApp.alert.home.createOrEditLabel');
    await alertUpdatePage.cancel();
  });

  it('should create and save Alerts', async () => {
    const nbButtonsBeforeCreate = await alertComponentsPage.countDeleteButtons();

    await alertComponentsPage.clickOnCreateButton();
    await promise.all([
      alertUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      alertUpdatePage.stateSelectLastOption(),
      alertUpdatePage.stockSelectLastOption()
    ]);
    expect(await alertUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    await alertUpdatePage.save();
    expect(await alertUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await alertComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Alert', async () => {
    const nbButtonsBeforeDelete = await alertComponentsPage.countDeleteButtons();
    await alertComponentsPage.clickOnLastDeleteButton();

    alertDeleteDialog = new AlertDeleteDialog();
    expect(await alertDeleteDialog.getDialogTitle()).to.eq('campacksysApp.alert.delete.question');
    await alertDeleteDialog.clickOnConfirmButton();

    expect(await alertComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
