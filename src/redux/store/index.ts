import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { memberSummarySlice } from "../slices/member-summary/MemberSummarySlice";
import { userPrefsSlice } from "../slices/users/UserPrefsSlice";
import { formularySummarySlice } from "../slices/formulary/formularySummarySlice";
import { combineReducers } from "redux";
import applicationReducer from "../slices/formulary/application/applicationSlice";
import setupReducer from "../slices/formulary/setup/setupSlice";
import setupOptionsReducer from "../slices/formulary/setup/setupOptionsSlice";
import dashboardReducer from "../slices/formulary/dashboard/dashboardSlice";
import messagingReducer from "../slices/formulary/messaging/messagingSlice";
import { gridSettingsSlice } from "../slices/formulary/gridHandler/gridSettingsSlice";
import { tierSlice } from "../slices/formulary/tier/tierSlice";
import { categoryClassSlice } from "../slices/formulary/categoryClass/categoryClassSlice";
import { switchSlice } from "../slices/formulary/switch/switchSlice";
import {
  validationList,
  validationNotesList,
} from "../slices/formulary/validation/validationSlice";
import advancedSearchReducer from "../slices/formulary/advancedSearch/advancedSearchSlice";
import additionalCriteriaReducer from "../slices/formulary/advancedSearch/additionalCriteriaSlice";
import headerReducer from "../slices/formulary/header/headerSlice";
import gdmReducer from "../slices/formulary/gdm/gdmSlice";
import gdmPaReducer from "../slices/formulary/pagdm/pagdmSlice";
import {
  stepTherapySlice,
  stVersionSlice,
} from "../slices/formulary/stepTherapy/stepTherapySlice";
import { paSlice, paVersionSlice } from "../slices/formulary/pa/paSlice";
import { qlSlice } from "../slices/formulary/ql/qlSlice";
import { formularyVersionHistorySlice } from "../slices/formulary/version-history/version-history.slice";

const reducer = combineReducers({
  // here we will be adding reducers
});

const middleware = [
  ...getDefaultMiddleware(),
  /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const memberSummaryReducer = memberSummarySlice.reducer;
const userPrefsReducer = userPrefsSlice.reducer;
const gridSettingsReducer = gridSettingsSlice.reducer;
const tierSliceReducer = tierSlice.reducer;
const paSliceReducer = paSlice.reducer;
const switchReducer = switchSlice.reducer;
const validationReducer = validationList.reducer;
const validationNotesReducer = validationNotesList.reducer;
const stepTherapy = stepTherapySlice.reducer;
const stVerion = stVersionSlice.reducer;
const paVersion = paVersionSlice.reducer;
const categoryClass = categoryClassSlice.reducer;

const pa = paSlice.reducer;

const ql = qlSlice.reducer;

const formularyVersionHistoryReducer = formularyVersionHistorySlice.reducer;

// The store is configured with the state and the corresponding reducers.
const store = configureStore({
  reducer: {
    application: applicationReducer,
    setup: setupReducer,
    setupOptions: setupOptionsReducer,
    dashboard: dashboardReducer,
    messaging: messagingReducer,
    member_summary: memberSummaryReducer,
    user_prefs: userPrefsReducer,
    tierSliceReducer: tierSliceReducer,
    switchReducer: switchReducer,
    validationReducer: validationReducer,
    validationNotesReducer: validationNotesReducer,
    gridSettings: gridSettingsReducer,
    header: headerReducer,
    saveGdm: gdmReducer,
    savePaGdm: gdmPaReducer,
    stepTherapyReducer: stepTherapy,
    advancedSearch: advancedSearchReducer,
    stVerion: stVerion,
    paReducer: pa,
    qlReducer: ql,
    paVersion: paVersion,
    categoryClass: categoryClass,
    additionalCriteria: additionalCriteriaReducer,
    formularyVersionHistory: formularyVersionHistoryReducer,
  },
  middleware,
});

export default store;

// Type of the state.

interface FRX_STATE {
  members: Map<string, any>;
  current_member_key: string;

  member_id: string;
  member_summary: {
    first_name: string;
    lastname_name: string;
    nickname?: string;
  };
  clinical_diagnosis_history: {
    list: Array<any>;
  };
  claims: {
    yearly_data: {};
  };
}
