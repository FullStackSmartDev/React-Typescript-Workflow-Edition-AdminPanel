// import { Tab, Tabs } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { TabInfo } from "../../models/tab.model";
import { getMainTabNames } from "../../utils/text-labels";
import Accumulators from "../accumulators/Accumulators";
import Barriers from "../barriers/Barriers";
import Claim from "../claim/Claim";
import Grievances from "../Grievances/Grievances";
import ClinicalDiagnosisHistory from "../clinical-diagnosis/ClinicalDiagnosisHistory";
import Formulary from "../formulary/Formulary";
import Pharmacy from "../pharmacy/Pharmacy";
import MemberInfoContainer from "../member-info-container/MemberInfoContainer";
import MemberNotification from "../member/MemberNotification";
import MemberCostshare from "../MemberCostshare/MemberCostshare";
import FrxTabs from "../shared/FrxTabs/FrxTabs";
import AttributesPanel from "../user-details/attributes-panel/AttributesPanel";
import SummaryInfo from "../SummaryInfo/SummaryInfo";
// import "../static/Static.scss";
import "./MemberProfile.scss";
import memberinfoService from "../../services/memberinfo.service";
import { MemberInfoResponse } from "../../models/http/member-info-response.model";
import { connect } from "react-redux";
import {
  getMemberSummary,
  getMemberAddress,
} from "../../redux/slices/member-summary/MemberSummaryActionCreator";
import ClaimsGrid from "../ClaimsGrid/ClaimsGrid";
import { Button } from "@material-ui/core";
import TestClaimsGrid from "../TestClaimsGrid/TestClaimsGrid";
import moment from "moment";
import DemoPage from "../BestPrice/demopage";
import FrxLoader from "../shared/FrxLoader/FrxLoader";
import FrxDrugSearchForm from "../shared/FrxDrugSearchForm/FrxDrugSearchForm";
import FrxSearchResults from "../shared/FrxSearchResults/FrxSearchResults";
import BestPrice from "../BestPrice/BestPrice";
import Constants from "../../constants/Constants";
import Communication from "../communication/Communication";
import AuthAndOverriders from "../AuthsAndOverrides/AuthsAndOverrides";

import {
  claimsGridColumnsForRejectedAndTotal,
  _claimsGridColumns,
  _grievancesGridColumns,
  _pacases_initial,
  _testClaimsGridColumns,
} from "../../utils/grid/columns";
import NewTestClaim from "../member/NewTestClaimComponent";
// import { _claimsGridColumns, _grievancesGridColumns, _pacases_initial, _testClaimsGridColumns } from "../../utils/grid/columns";
import { getGrievancesGridData } from "../../mocks/grid/grievances-mock";
import { getClaimsGridData } from "../../mocks/grid/claims-mock";
import { getPAInitialData } from "../../mocks/grid/prior-auto-mock";
import PriorAuthorizations from "../prior-Authorizations/PriorAuthorizations";
import { getClaimsSearchData } from "../../mocks/search/claims-search-mock";
import { getTestClaimsSearchData } from "../../mocks/search/test-claims-search-mock-data";
import { getGrieviencesSearchData } from "../../mocks/search/grievences-search-mock";
import {
  getUserPrefs,
  setUserPrefs,
} from "../../redux/slices/users/UserPrefsActionCreator";
import GrievanceOverlay from "../Grievances/components/GrievanceOverlay/GrievanceOverlay";

// Redux store related functions.
// Dispatch action
/**
 *
 * @param dispatch
 * For now, ensure the same member_id is used for both action creators.
 * TODO: Fix the above.
 */
function mapDispatchToProps(dispatch) {
  return {
    getMemberSummary: (member_id) => {
      dispatch(getMemberSummary(member_id));
    },
    getMemberAddress: (member_id) => {
      dispatch(getMemberAddress(member_id));
    },
    setPrefs: (member_id) => {
      dispatch(setUserPrefs(member_id));
    },
    getPrefs: (member_id) => {
      dispatch(getUserPrefs(member_id));
    },
  };
}

// Get state as props
const mapStateToProps = (state) => {
  return {
    memberSummary: state.member_summary,
    userPrefs: state.user_prefs,
  };
};

class ConnectedMemberProfile extends React.Component<any, any> {
  state = {
    tabs: getMainTabNames(),
    activeTabIndex: 0,
    memberInfo: null,
    isMemberDropDownOpen: false,
    demographicsData: [],
    elegibilityData: [],
    providersData: [],
    prefrencesData: [],
    user: undefined,
    loading: true,
    memberInformation: [],
    contactInformation: [],
    newGrievances: false,
    openPopup: false,
    claimIndex: 0,
    grievanceToggle: false,
  };

  componentDidMount = () => {
    console.log("MemberProfile::componentDidMount", this.props);
    this.props.getMemberSummary(Constants.MEMBER_ID);
    this.props.getMemberAddress(Constants.MEMBER_ID);
    this.getInfoCardData(Constants.MEMBER_ID);
    this.getMemberData(Constants.MEMBER_ID);
    // this.props.getPrefs(Constants.MEMBER_ID)
    if (this.props.match) {
      if (
        this.props.match.params.path &&
        this.props.match.params.path.trim() === "dashPa"
      ) {
        this.setState({
          claimIndex: 2,
        });
      }
    }
  };

  onButtonClick = () => {
    console.log("invoked onButtonClick", this.state.openPopup);

    this.setState({
      openPopup: !this.state.openPopup,
    });
  };

  componentDidUpdate = (prevProps) => {
    console.log("MemberProfile::componentDidUpdate");
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({
      newGrievances: false,
    });
    this.setState({ tabs, activeTabIndex });
  };

  //To verify api integrtion. Refactor.
  // you will get member id here . id is in mock data for user details
  onMemberSelect = async (id) => {
    console.log("member id ", id);
    // const response = await memberinfoService.getMember(id);
    // const responseData: MemberInfoResponse = response.data;
    // if (responseData && responseData.meta && responseData.meta.success) {
    //   console.log("member details ", responseData.data);
    //   if (responseData.data && responseData.data.length > 0) {
    //     let memberInfo = responseData.data[0];
    //     this.setState({ memberInfo, isMemberDropDownOpen: false });
    //   }
    // } else {
    //   console.log("error in getting data ", responseData.error);
    // }

    this.getInfoCardData(id);
  };
  getMemberData = async (id) => {
    const res = await memberinfoService.getMember(id).then((res) => {
      const memberInformation = res.data.data;
      this.setState({ memberInformation });
    });
    const resContactInfo = await memberinfoService
      .getContactInfo(id)
      .then((res) => {
        const contactInformation = res.data.data;
        this.setState({ contactInformation });
      });
  };
  getInfoCardData = async (id) => {
    const res = await memberinfoService.getInfoCardsData(id);
    // Demographics //

    if (res && res.data.data) {
      const preferences = res.data.data.preferences;
      const summary = res.data.data.member_summary;
      const providers = res.data.data.providers;
      const pcpData = providers.pcp;
      const pcpLocation1 = providers.pcp.data.locations[0];
      const pcpLocation2 = providers.pcp.data.locations[1];
      const eligibility = res.data.data.eligibility;
      const demographics = res.data.data.demographics;

      let demographicsData = [
        {
          member_id: demographics.member_id,
          dob: demographics.dob,
          language: demographics.language,
        },
      ];

      let elegibilityData = [
        {
          start_date: eligibility.start_date,
          term_date: eligibility.term_date,
          transition_date: eligibility.transition_date,
        },
      ];

      let prefrencesData = [
        {
          pcm: preferences.pcm,
          aor_poa: preferences.aor_poa,
        },
      ];
      let user = {
        family_id: summary.family_id,
        family_members: summary.family_members,
        first_name: summary.first_name,
        middle_name: summary.middle_name,
        last_name: summary.last_name,
        id_member_info: summary.id_member_info,
        status: summary.status,
        img_url: summary.img_url,
        gender: summary.gender,
        lob: summary.lob,
      };

      let providersData = [
        {
          pcp: pcpData.pcp,
          primary_pharmacy: providers.primary_pharmacy.primary_pharmacy,
          secondary_pharmacy: providers.secondary_pharmacy.secondary_pharmacy,
          physician_since: pcpData.data.physician_since,
          in_network: pcpData.data.in_network,
          npi: pcpData.data.npi,
          address1: pcpLocation1.address,
          phone1: pcpLocation1.phone,
          fax1: pcpLocation1.fax,
          address2: pcpLocation2.address,
          phone2: pcpLocation2.phone,
          fax2: pcpLocation2.fax,
          primary_pharmacy_npi: providers.primary_pharmacy.data.npi,
          primary_pharmacy_address: providers.primary_pharmacy.data.address,
          primary_pharmacy_phone: providers.primary_pharmacy.data.phone,
          primary_pharmacy_fax: providers.primary_pharmacy.data.fax,
          secondary_pharmacy_npi: providers.secondary_pharmacy.data.npi,
          secondary_pharmacy_address: providers.secondary_pharmacy.data.address,
          secondary_pharmacy_phone: providers.secondary_pharmacy.data.phone,
          secondary_pharmacy_fax: providers.secondary_pharmacy.data.fax,
        },
      ];

      this.setState({
        user,
        prefrencesData,
        providersData,
        elegibilityData,
        demographicsData,
        loading: false,
      });
    }
    // Prefrences //
  };
  hideMembers = () => {
    console.log("hide");
    this.setState({ isMemberDropDownOpen: false });
  };
  showMembers = () => {
    console.log("open");
    this.setState({ isMemberDropDownOpen: true });
  };

  onNewGrievancesClickHandler = () => {
    this.setState({
      newGrievances: !this.state.newGrievances,
    });
  };

  render() {
    console.log("member info", this.state.memberInformation);
    console.log(this.props);
    return (
      <div
        className={`member-profile-root ${this.state.newGrievances ? "new-grievance-root" : ""
          }`}
      >
        {this.state.loading ? (
          <FrxLoader />
        ) :
          (<>
            <FrxTabs
              tabList={this.state.tabs}
              typeCard={"line"}
              activeTabIndex={this.state.activeTabIndex}
              onClickTab={this.onClickTab}
            />
            {(this.state.activeTabIndex === 0 && !this.state.newGrievances) ? (
              <>
                <MemberInfoContainer
                  hideMembers={this.hideMembers}
                  showMembers={this.showMembers}
                  isOpen={this.state.isMemberDropDownOpen}
                  onMemberSelect={this.onMemberSelect}
                  user={this.state.user}
                  // memberInformation={this.state.memberInformation}
                  memberInformation={[this.props.memberSummary.memberDetails]}
                  contactInformation={[this.props.memberSummary.memberAddress]}
                />
                <Container className="tab-content">
                  {/* <MemberInfo /> */}
                  <SummaryInfo
                    memberInfo={this.state.memberInfo} // This is null.
                    demographicsData={this.state.demographicsData}
                    elegibilityData={this.state.elegibilityData}
                    providersData={this.state.providersData}
                    prefrencesData={this.state.prefrencesData}
                  />
                  <div>
                    <Container className="member-components-container">
                      <Grid item xs={12}>
                        <div className="bg-white attributes-container">
                          {/* <Attributes /> */}
                          <AttributesPanel />
                        </div>
                      </Grid>
                    </Container>
                  </div>
                  <div>
                    <Container className="member-components-container">
                      <Grid container>
                        <Grid item xs={7}>
                          <div className="bg-white cdh1-mn-container">
                            <ClinicalDiagnosisHistory />
                          </div>
                        </Grid>
                        <Grid item xs={5}>
                          <div className="bg-white cdh-mn-container">
                            <MemberNotification />
                          </div>
                        </Grid>
                      </Grid>
                    </Container>
                  </div>
                  <div>
                    <Container className="member-components-container">
                      <Grid container>
                        <Grid item xs={8}>
                          <div className="bg-white acc-barr-container">
                            <Accumulators />
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div className="bg-white acc-barr-container">
                            <Barriers />
                          </div>
                        </Grid>
                      </Grid>
                    </Container>
                  </div>
                  <div>
                    <Container className="member-components-container">
                      <Grid item xs={12}>
                        <div className="bg-white claim-container">
                          <Claim activeIndex={this.state.claimIndex} onSwitchNewGrievance={this.onNewGrievancesClickHandler} />
                        </div>
                      </Grid>
                    </Container>
                  </div>
                  <div>
                    <Container className="member-components-container">
                      <Grid item xs={12}>
                        <div className="bg-white membercostshare-container">
                          <MemberCostshare />
                        </div>
                      </Grid>
                    </Container>
                  </div>

                  {/* </Container> */}
                </Container>
              </>
            ) : (this.state.activeTabIndex === 1 && !this.state.newGrievances) ? (
              <Container className="tab-content formulary-content">
                <Formulary history={this.props.history} />
              </Container>
            ) : (this.state.activeTabIndex === 2 && !this.state.newGrievances) ? (
              <Container className="tab-content">
                <Pharmacy />
              </Container>
            ) : (this.state.activeTabIndex === 3 && !this.state.newGrievances) ? (
              <Container className="tab-content">
                <BestPrice />
              </Container>
            ) : (this.state.activeTabIndex === 4 && !this.state.newGrievances) ? (
              <Container className="tab-content">
                <div className="claims-root">
                  <TestClaimsGrid
                    header={(callBack: any) => {
                      return (
                        <div className="claimsbuttongroup-root">
                          <div className="heading">Test Claims</div>
                          <div className="button">
                            <Button
                              className="btn-claims"
                              onClick={this.onButtonClick}
                            >
                              {" "}
                              + New Test Claim
                            </Button>
                            <Button className="btn-claims" onClick={callBack}>
                              Claim Compare
                            </Button>

                            {this.state.openPopup ? (
                              <NewTestClaim
                                isOpen={this.state.openPopup}
                                onClose={this.onButtonClick}
                                panelName="demographics-tab"
                                title="New Test Claim"
                              />
                            ) : (
                                ""
                              )}
                          </div>
                        </div>
                      );
                    }}
                    type="CLAIMSHISTORY"
                    data={getClaimsGridData}
                    settingsTriDotMenuClick={(callBack: any, item: any) => {
                      if (item.title === "Claim Compare") {
                        callBack();
                      }
                    }}
                    settingsWidth={20}
                    columns={_testClaimsGridColumns}
                    searchOptions={getTestClaimsSearchData}
                    onColumnCellClick={""}
                  />
                </div>
              </Container>
            ) : (this.state.activeTabIndex === 5 && !this.state.newGrievances) ? (
              <Container className="tab-content">
                <div className="claims-root">
                  <TestClaimsGrid
                    type="CLAIMS"
                    header={(callBack: any) => {
                      return (
                        <div className="claimsbuttongroup-root">
                          <div className="heading">Claims</div>
                          <div className="button">
                            <Button
                              className="btn-claims"
                              onClick={this.onButtonClick}
                            >
                              {" "}
                              + New Test Claim
                            </Button>
                            <Button className="btn-claims" onClick={callBack}>
                              Claim Compare
                            </Button>
                            {this.state.openPopup ? (
                              <NewTestClaim
                                isOpen={this.state.openPopup}
                                onClose={this.onButtonClick}
                                panelName="demographics-tab"
                                title="New Test Claim"
                              />
                            ) : null}
                          </div>
                        </div>
                      );
                    }}
                    columns={claimsGridColumnsForRejectedAndTotal}
                    data={getClaimsGridData}
                    settingsTriDotMenuClick={(callBack: any, item: any) => {
                      if (item.title === "Claim Compare") {
                        callBack();
                      }
                    }}
                    // searchOptions={getClaimsSearchData} />
                    searchOptions={getClaimsSearchData}
                    onColumnCellClick={""}
                    settingsWidth={20}
                  />
                </div>
              </Container>
            ) : (this.state.activeTabIndex === 6 && !this.state.newGrievances) ? (
              <Container className="tab-content">
                <div className="prior-auth-root">
                  <PriorAuthorizations />
                </div>
              </Container>
            ) : (this.state.activeTabIndex === 7 || this.state.newGrievances) ? (
              <Container className="tab-content grievances-tab-content">
                <div className="grievances-member-profile-root">
                  <div className="grievances-root">
                    <Grievances
                      isOpen={this.state.newGrievances}
                      onSwitchNewGrievance={this.onNewGrievancesClickHandler}
                      memberInformation={[
                        this.props.memberSummary.memberDetails,
                      ]}
                      contactInformation={[
                        this.props.memberSummary.memberAddress,
                      ]}
                    />
                  </div>
                  {!this.state.newGrievances && (
                    <TestClaimsGrid
                      type="Grievances"
                      header={(callBack: any) => {
                        return <></>;
                      }}
                      columns={_grievancesGridColumns}
                      searchOptions={getGrieviencesSearchData}
                      data={getGrievancesGridData}
                      onColumnCellClick={this.onNewGrievancesClickHandler}
                      settingsWidth={20}
                    />
                  )}
                  {/* <Grievances /> */}
                </div>
              </Container>
            ) : (this.state.activeTabIndex === 8 && !this.state.newGrievances) ? (
              <Container className="tab-content">
                <div className="auth-overrides-member-profile-root">
                  <AuthAndOverriders />
                </div>
              </Container>
            ) : this.state.activeTabIndex === 9 ? (
              <Container className="tab-content">
                <div className="communication-member-profile-root">
                  <Communication />
                </div>
              </Container>
            ) : (
                                  <Container className="tab-content">
                                    <></>
                                  </Container>
                                )}
          </>)

        }
      </div>
    );
  }
}

// Connect component with store.
const MemberProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedMemberProfile);
export default MemberProfile;
