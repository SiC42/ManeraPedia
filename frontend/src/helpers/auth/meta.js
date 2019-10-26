export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const ACCESS_TOKEN = "ACCESS_TOKEN";

export function addAuthNeededMeta(type) {
  return {
    authNeeded: true,
    authType: type
  };
}

export function authNeeded(action) {
  return action.meta && action.meta.authNeeded;
}

export function getAuthMetaType(action) {
  return action.meta.authType;
}
