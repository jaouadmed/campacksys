/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MissionComponentsPage, MissionDeleteDialog, MissionUpdatePage } from './mission.page-object';

const expect = chai.expect;

describe('Mission e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let missionUpdatePage: MissionUpdatePage;
  let missionComponentsPage: MissionComponentsPage;
  /*let missionDeleteDialog: MissionDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Missions', async () => {
    await navBarPage.goToEntity('mission');
    missionComponentsPage = new MissionComponentsPage();
    await browser.wait(ec.visibilityOf(missionComponentsPage.title), 5000);
    expect(await missionComponentsPage.getTitle()).to.eq('campacksysApp.mission.home.title');
  });

  it('should load create Mission page', async () => {
    await missionComponentsPage.clickOnCreateButton();
    missionUpdatePage = new MissionUpdatePage();
    expect(await missionUpdatePage.getPageTitle()).to.eq('campacksysApp.mission.home.createOrEditLabel');
    await missionUpdatePage.cancel();
  });

  /* it('should create and save Missions', async () => {
        const nbButtonsBeforeCreate = await missionComponentsPage.countDeleteButtons();

        await missionComponentsPage.clickOnCreateButton();
        await promise.all([
            missionUpdatePage.setCreationDateInput('2000-12-31'),
            missionUpdatePage.setNbrDaysInput('5'),
            missionUpdatePage.setStartDateInput('2000-12-31'),
            missionUpdatePage.stateSelectLastOption(),
            missionUpdatePage.teamSelectLastOption(),
            missionUpdatePage.clientSelectLastOption(),
        ]);
        expect(await missionUpdatePage.getCreationDateInput()).to.eq('2000-12-31', 'Expected creationDate value to be equals to 2000-12-31');
        expect(await missionUpdatePage.getNbrDaysInput()).to.eq('5', 'Expected nbrDays value to be equals to 5');
        expect(await missionUpdatePage.getStartDateInput()).to.eq('2000-12-31', 'Expected startDate value to be equals to 2000-12-31');
        await missionUpdatePage.save();
        expect(await missionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await missionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Mission', async () => {
        const nbButtonsBeforeDelete = await missionComponentsPage.countDeleteButtons();
        await missionComponentsPage.clickOnLastDeleteButton();

        missionDeleteDialog = new MissionDeleteDialog();
        expect(await missionDeleteDialog.getDialogTitle())
            .to.eq('campacksysApp.mission.delete.question');
        await missionDeleteDialog.clickOnConfirmButton();

        expect(await missionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
