import reducer from "./reducers";

import * as authSelectors from "./selectors";
import * as authOperations from "./operations";
import * as authTypes from "./types";
import authSaga from "./saga";

export { authSelectors, authOperations, authTypes, authSaga };

export default reducer;
