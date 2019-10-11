/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrderComponentsPage, OrderDeleteDialog, OrderUpdatePage } from './order.page-object';

const expect = chai.expect;

describe('Order e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orderUpdatePage: OrderUpdatePage;
  let orderComponentsPage: OrderComponentsPage;
  /*let orderDeleteDialog: OrderDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Orders', async () => {
    await navBarPage.goToEntity('order');
    orderComponentsPage = new OrderComponentsPage();
    await browser.wait(ec.visibilityOf(orderComponentsPage.title), 5000);
    expect(await orderComponentsPage.getTitle()).to.eq('campacksysApp.order.home.title');
  });

  it('should load create Order page', async () => {
    await orderComponentsPage.clickOnCreateButton();
    orderUpdatePage = new OrderUpdatePage();
    expect(await orderUpdatePage.getPageTitle()).to.eq('campacksysApp.order.home.createOrEditLabel');
    await orderUpdatePage.cancel();
  });

  /* it('should create and save Orders', async () => {
        const nbButtonsBeforeCreate = await orderComponentsPage.countDeleteButtons();

        await orderComponentsPage.clickOnCreateButton();
        await promise.all([
            orderUpdatePage.setDateInput('2000-12-31'),
            orderUpdatePage.setTotalInput('5'),
            orderUpdatePage.stateSelectLastOption(),
            orderUpdatePage.discountSelectLastOption(),
            orderUpdatePage.paymentSelectLastOption(),
            orderUpdatePage.clientSelectLastOption(),
            orderUpdatePage.employeeSelectLastOption(),
        ]);
        expect(await orderUpdatePage.getDateInput()).to.eq('2000-12-31', 'Expected date value to be equals to 2000-12-31');
        expect(await orderUpdatePage.getTotalInput()).to.eq('5', 'Expected total value to be equals to 5');
        await orderUpdatePage.save();
        expect(await orderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Order', async () => {
        const nbButtonsBeforeDelete = await orderComponentsPage.countDeleteButtons();
        await orderComponentsPage.clickOnLastDeleteButton();

        orderDeleteDialog = new OrderDeleteDialog();
        expect(await orderDeleteDialog.getDialogTitle())
            .to.eq('campacksysApp.order.delete.question');
        await orderDeleteDialog.clickOnConfirmButton();

        expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
