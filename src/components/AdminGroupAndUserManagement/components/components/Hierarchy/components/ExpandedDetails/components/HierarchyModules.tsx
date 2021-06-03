import React from "react";
import FrxDialogPopup from "../../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import OutsideVendorTooltipForm from "../../../../ModuleManagement/components/OutsideVendorTooltipForm";
import TagTooltip from "../../../../ModuleManagement/components/TagTooltip";
import "./HierarchyExpandedMenu.scss";


const TAGS = [
    {
      id: 1,
      title: "Admin",
      administeredBy: "FutureRx@Futurerx.com",
      moduleProvidedBy: "FutureRx@Futurerx.com",
      participants: ["starcompany@star.com", "careservices@care.com"],
    },
    {
      id: 2,
      title: "Formulary",
      administeredBy: "FutureRx@Futurerx.com",
      moduleProvidedBy: "FutureRx@Futurerx.com",
      participants: ["starcompany@star.com", "careservices@care.com"],
    },
    {
      id: 3,
      title: "Benefits",
      administeredBy: "FutureRx@Futurerx.com",
      moduleProvidedBy: "FutureRx@Futurerx.com",
      participants: ["starcompany@star.com", "careservices@care.com"],
    },
    {
      id: 4,
      title: "PA",
      administeredBy: "FutureRx@Futurerx.com",
      moduleProvidedBy: "FutureRx@Futurerx.com",
      participants: ["starcompany@star.com", "careservices@care.com"],
    },
    {
      id: 5,
      title: "Claims",
      administeredBy: "FutureRx@Futurerx.com",
      moduleProvidedBy: "FutureRx@Futurerx.com",
      participants: ["starcompany@star.com", "careservices@care.com"],
    },
  ];
  
export default class HierarchyModules extends React.Component<any, any> {
    state = {
        modalStatus: false,
        type: "",
        modalTitle: "",
      };
    
      handleOpenModal = () => {
        this.setState({
          modalStatus: true,
        });
      };
    handleTooltipEditButtonClick = (id: any) => {
        const modalTitle = TAGS.find((t) => t.id === id)?.title;
        this.setState(
          {
            modalTitle,
          },
          () => {
            this.handleOpenModal();
          }
        );
      };

    renderNodeTags = (data: any = {}) => {
        const tags = TAGS.map((tag, key) => (
          <TagTooltip
            key={key}
            {...tag}
            onEditClick={(id) => this.handleTooltipEditButtonClick(id)}
          >
            <div key="tag" className="tree-node-tag hierarchy-tag">
              {tag.title}
            </div>
          </TagTooltip>
        ));
    
        return <div className="tree-node-tag-list">{tags}</div>;
      };

      handleCloseModal = () => {
        this.setState({
          modalStatus: false,
          type: "",
        });
      };
      renderNodeModalsBody = () => {
        return (
          <div>
            {/*Todo for Bilal:  This is the modal Body */}
            <OutsideVendorTooltipForm>
              <button>Click To Show Form Tooltip</button>
            </OutsideVendorTooltipForm>
          </div>
        );
      };
    render(){
        return(
            <div className="hierarchyModulesContainer">
            {this.renderNodeTags()}
            <FrxDialogPopup
            showCloseIcon={true}
            positiveActionText="Save"
            negativeActionText=""
            title={this.state.modalTitle}
            handleClose={this.handleCloseModal}
            handleAction={() => console.log("no action")}
            open={this.state.modalStatus}
            showActions={true}
            className="modulesModalContainer"
          >
            {this.renderNodeModalsBody()}
          </FrxDialogPopup>
            </div>
        );
    }
    
}