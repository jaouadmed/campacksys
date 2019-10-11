/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrderStockComponentsPage, OrderStockDeleteDialog, OrderStockUpdatePage } from './order-stock.page-object';

const expect = chai.expect;

describe('OrderStock e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orderStockUpdatePage: OrderStockUpdatePage;
  let orderStockComponentsPage: OrderStockComponentsPage;
  let orderStockDeleteDialog: OrderStockDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OrderStocks', async () => {
    await navBarPage.goToEntity('order-stock');
    orderStockComponentsPage = new OrderStockComponentsPage();
    await browser.wait(ec.visibilityOf(orderStockComponentsPage.title), 5000);
    expect(await orderStockComponentsPage.getTitle()).to.eq('campacksysApp.orderStock.home.title');
  });

  it('should load create OrderStock page', async () => {
    await orderStockComponentsPage.clickOnCreateButton();
    orderStockUpdatePage = new OrderStockUpdatePage();
    expect(await orderStockUpdatePage.getPageTitle()).to.eq('campacksysApp.orderStock.home.createOrEditLabel');
    await orderStockUpdatePage.cancel();
  });

  it('should create and save OrderStocks', async () => {
    const nbButtonsBeforeCreate = await orderStockComponentsPage.countDeleteButtons();

    await orderStockComponentsPage.clickOnCreateButton();
    await promise.all([
      orderStockUpdatePage.setDateInput('2000-12-31'),
      orderStockUpdatePage.setQuantityInput('5'),
      orderStockUpdatePage.stateSelectLastOption(),
      orderStockUpdatePage.alertSelectLastOption(),
      orderStockUpdatePage.supplierSelectLastOption(),
      orderStockUpdatePage.employeeSelectLastOption()
    ]);
    expect(await orderStockUpdatePage.getDateInput()).to.eq('2000-12-31', 'Expected date value to be equals to 2000-12-31');
    expect(await orderStockUpdatePage.getQuantityInput()).to.eq('5', 'Expected quantity value to be equals to 5');
    await orderStockUpdatePage.save();
    expect(await orderStockUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await orderStockComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last OrderStock', async () => {
    const nbButtonsBeforeDelete = await orderStockComponentsPage.countDeleteButtons();
    await orderStockComponentsPage.clickOnLastDeleteButton();

    orderStockDeleteDialog = new OrderStockDeleteDialog();
    expect(await orderStockDeleteDialog.getDialogTitle()).to.eq('campacksysApp.orderStock.delete.question');
    await orderStockDeleteDialog.clickOnConfirmButton();

    expect(await orderStockComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
