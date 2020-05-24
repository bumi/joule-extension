import handleLndHttp from './handleLndHttp';
import handlePrompts from './handlePrompts';
import handlePassword from './handlePassword';
import handleContextMenu from './handleContextMenu';
import handleNotifications from './handleNotifications';
import handlePaymentRequired from './handlePaymentRequired';

function initBackground() {
  handleLndHttp();
  handlePrompts();
  handlePassword();
  handleContextMenu();
  handleNotifications();
  handlePaymentRequired();
}

initBackground();
