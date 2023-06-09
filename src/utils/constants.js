import { base } from '../../public/app.config.json';
const { MOCK, NODE_ENV, } = process.env;

const getServerPath = function () {
  if (NODE_ENV !== 'production') {
    if (MOCK === 'true') {
      return '/mocker.api';
    } else {
      return '/service.api'
    }
  }
  return `${BASE_DOMAIN}${GATEWAY}`
}

const BASE_DOMAIN = '/';

const GATEWAY = 'api-gateway';

const APP_BASE = base;

const LOCAL_PATH = NODE_ENV !== 'production' ? '..' : `../${APP_BASE}`;

const SERVER_PATH = getServerPath();

const CONST_GLOBAL = {
  SESSION: '_s',
  TOKEN_KEY: 'x-sid',
  AUTH: 'AUTH',
  POLICY: 'POLICY',
  CURRENT_LOCALE: 'sei_locale',
  CURRENT_USER: 'CURRENT_USER',
  FEATURE_KEY: 'FEATURE_KEY',
  AUTHORIZATION: 'Authorization',
};

const AUTH_POLICY = {
  USER: 'NormalUser',
  TENANT_ADMIN: 'TenantAdmin',
  ADMIN: 'GlobalAdmin',
};


/** 升级的常量放到这里 */

export const baseUrl = "/flow-service";
export const authApiUrl = "/sei-auth";
export const flowDefUrl= "/sei-flow-web/#/sei-flow-web/design";
export const flowDefUrlNew="/sei-flow-web/#/sei-flow-web/design";

export const defaultPageSize = 15;
export const rowGutter = 20;
export const defaultPageSizeOptions = ['15', '50', '100'];

export const TASK_TYPE = {TODO: "todo", COMPLETE: "complete", ORDER: "order"};
/** 升级的常量放到这里 */

export {
  APP_BASE,
  LOCAL_PATH,
  SERVER_PATH,
  AUTH_POLICY,
  CONST_GLOBAL,
};


