import { browser } from 'webextension-polyfill-ts';
import { isValidPaymentReq } from 'utils/validators';
import { getOriginData } from 'utils/prompt';
import { openPrompt } from './handlePrompts';
import { PROMPT_TYPE } from '../webln/types';
import { SendPaymentArguments } from 'lnd/message';

function observe(requestDetails: any) {
  console.log('hallo');
  console.log(requestDetails);
  return { authCredentials: { username: 'foo', password: 'bar' } };
}

export default function handlePaymentRequired() {
  console.log('handlePaymentRequired');
  browser.webRequest.onHeadersReceived.addListener(
    (requestDetails: any) => {
      console.log('hallo');
      console.log(requestDetails);
      const authHeader = requestDetails.responseHeaders.find(
        (h: any) => h.name.toLowerCase() === 'www-authenticate',
      );
      console.log(authHeader.value.toLowerCase());
      if (
        requestDetails.method !== 'GET' ||
        requestDetails.statusCode !== 402 ||
        !authHeader ||
        authHeader.value.toLowerCase().substring(0, 4) !== 'lsat'
      ) {
        console.log('return');
        return;
      }
      const invoice = authHeader.value.match(/.*invoice="(.+)"/)[1];
      const macaroon = authHeader.value.match(/.*macaroon="(.+)"/)[1];
      if (!invoice || !isValidPaymentReq(invoice)) {
        return;
      }
      console.log(invoice);
      console.log(macaroon);
      // return {authCredentials: {username: 'foo', password: 'bar'}};
      const msg = {
        type: 'SEND_PAYMENT',
        payload: { payment_request: invoice },
      };
      browser.runtime
        .sendMessage(msg)
        .then(console.log)
        .catch(console.log);
      return { cancel: true };
    },
    { urls: ['<all_urls>'] },
    ['blocking', 'responseHeaders'],
  );
  console.log('handlePaymentRequired done');
}
