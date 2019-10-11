/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DurationComponentsPage, DurationDeleteDialog, DurationUpdatePage } from './duration.page-object';

const expect = chai.expect;

describe('Duration e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let durationUpdatePage: DurationUpdatePage;
  let durationComponentsPage: DurationComponentsPage;
  let durationDeleteDialog: DurationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Durations', async () => {
    await navBarPage.goToEntity('duration');
    durationComponentsPage = new DurationComponentsPage();
    await browser.wait(ec.visibilityOf(durationComponentsPage.title), 5000);
    expect(await durationComponentsPage.getTitle()).to.eq('campacksysApp.duration.home.title');
  });

  it('should load create Duration page', async () => {
    await durationComponentsPage.clickOnCreateButton();
    durationUpdatePage = new DurationUpdatePage();
    expect(await durationUpdatePage.getPageTitle()).to.eq('campacksysApp.duration.home.createOrEditLabel');
    await durationUpdatePage.cancel();
  });

  it('should create and save Durations', async () => {
    const nbButtonsBeforeCreate = await durationComponentsPage.countDeleteButtons();

    await durationComponentsPage.clickOnCreateButton();
    await promise.all([
      durationUpdatePage.setDateFromInput('2000-12-31'),
      durationUpdatePage.setDateToInput('2000-12-31'),
      durationUpdatePage.missionSelectLastOption()
    ]);
    expect(await durationUpdatePage.getDateFromInput()).to.eq('2000-12-31', 'Expected dateFrom value to be equals to 2000-12-31');
    expect(await durationUpdatePage.getDateToInput()).to.eq('2000-12-31', 'Expected dateTo value to be equals to 2000-12-31');
    await durationUpdatePage.save();
    expect(await durationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await durationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Duration', async () => {
    const nbButtonsBeforeDelete = await durationComponentsPage.countDeleteButtons();
    await durationComponentsPage.clickOnLastDeleteButton();

    durationDeleteDialog = new DurationDeleteDialog();
    expect(await durationDeleteDialog.getDialogTitle()).to.eq('campacksysApp.duration.delete.question');
    await durationDeleteDialog.clickOnConfirmButton();

    expect(await durationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
