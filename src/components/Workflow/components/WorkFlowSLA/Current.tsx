import React, { Fragment } from "react";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import { WorkflowColumns } from "../../../../utils/grid/columns";
import "./WorkflowSLA.scss"
import api from "../../../../api/index";

class CurrentWorkflowSLA extends React.Component {
    state = {
        slaData: [],
        isActionClick: false,
        showSlaTable: false,
        MainHeading: 'Workflow'
    };

    async componentDidMount() {
        try {
            const { data } = await api.fetchWorkFlows();
            this.setState({
                slaData: data.result
            })
        } catch (e) {
            console.log(e);
        }
    }

    onActionClick = (id: any) => {
        this.setState({
            isActionClick: !this.state.isActionClick
        });
    }

    switchMode = () => {
        this.setState({
            showSlaTable: !this.state.showSlaTable,
            MainHeading: 'Workflow SLA'
        });
    }


    render() {

        return (
            <Fragment>
                {this.state.isActionClick === false ? (
                    <Fragment>
                        <div className="grid-header-credit">
                            <h1>{this.state.MainHeading}</h1>
                        </div>

                        {this.state.showSlaTable === false ? (
                            <div className="sla-grid-container">

                                <div className="subscriptions-grid-inner-container">
                                    <FrxGridContainer
                                        enableSearch
                                        enableColumnDrag
                                        onSearch={() => { }}
                                        enableSettings
                                        fixedColumnKeys={["claimId"]}
                                        gridName=""
                                        isFetchingData={false}
                                        // columns={BazaarPartnerPaymentColumns({
                                        //     onActionClick: (id: any) =>
                                        //       this.onActionClick(id),
                                        //   })}
                                        columns={WorkflowColumns()}
                                        data={this.state.slaData}
                                        pagintionPosition="topRight"
                                        onSettingsClick="grid-menu"
                                        scroll={{ x: 0, y: 0 }}
                                        totalRowsCount={50}
                                    />
                                </div>

                            </div>
                        ) : (
                                <h1>test</h1>

                            )}

                    </Fragment>) : (
                        //need to update screen conditional or add new screen

                        <h1>abc</h1>
                    )
                }
            </Fragment>
        );
    }
}

export default CurrentWorkflowSLA;
