/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ItemLineComponentsPage, ItemLineDeleteDialog, ItemLineUpdatePage } from './item-line.page-object';

const expect = chai.expect;

describe('ItemLine e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemLineUpdatePage: ItemLineUpdatePage;
  let itemLineComponentsPage: ItemLineComponentsPage;
  /*let itemLineDeleteDialog: ItemLineDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ItemLines', async () => {
    await navBarPage.goToEntity('item-line');
    itemLineComponentsPage = new ItemLineComponentsPage();
    await browser.wait(ec.visibilityOf(itemLineComponentsPage.title), 5000);
    expect(await itemLineComponentsPage.getTitle()).to.eq('campacksysApp.itemLine.home.title');
  });

  it('should load create ItemLine page', async () => {
    await itemLineComponentsPage.clickOnCreateButton();
    itemLineUpdatePage = new ItemLineUpdatePage();
    expect(await itemLineUpdatePage.getPageTitle()).to.eq('campacksysApp.itemLine.home.createOrEditLabel');
    await itemLineUpdatePage.cancel();
  });

  /* it('should create and save ItemLines', async () => {
        const nbButtonsBeforeCreate = await itemLineComponentsPage.countDeleteButtons();

        await itemLineComponentsPage.clickOnCreateButton();
        await promise.all([
            itemLineUpdatePage.setQuantityInput('5'),
            itemLineUpdatePage.setTotalInput('5'),
            itemLineUpdatePage.orderSelectLastOption(),
            itemLineUpdatePage.productSelectLastOption(),
        ]);
        expect(await itemLineUpdatePage.getQuantityInput()).to.eq('5', 'Expected quantity value to be equals to 5');
        expect(await itemLineUpdatePage.getTotalInput()).to.eq('5', 'Expected total value to be equals to 5');
        await itemLineUpdatePage.save();
        expect(await itemLineUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await itemLineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last ItemLine', async () => {
        const nbButtonsBeforeDelete = await itemLineComponentsPage.countDeleteButtons();
        await itemLineComponentsPage.clickOnLastDeleteButton();

        itemLineDeleteDialog = new ItemLineDeleteDialog();
        expect(await itemLineDeleteDialog.getDialogTitle())
            .to.eq('campacksysApp.itemLine.delete.question');
        await itemLineDeleteDialog.clickOnConfirmButton();

        expect(await itemLineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
