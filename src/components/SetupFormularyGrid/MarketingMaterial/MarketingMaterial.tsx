import React, { Component, Fragment } from "react";
import CustomMenu from "../../shared/Frx-components/menu/CustomMenu";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { Container, List, ListItem, ListItemText } from "@material-ui/core";
import "./MarketingMaterial.scss";
import FrxInfoCard from "../../shared/FrxInfoCard/FrxInfoCard";
import CustomAccordion from "../../shared/Frx-components/accordion/CustomAccordion";
import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import Button from "../../shared/Frx-components/button/Button";
import SearchToolConfiguration from "./SearchToolConfiguration";
import CostShareDetails from './CostShareDetails';
import PlainLanguageDescriptor from './PlainLanguageDescriptor';
import MaterialSearchTool from "./MaterialSearchTool";
import MarketingMaterialTable from "./MarketingMaterialTable"

const costShareData = [
  {tierNumber: 'Tier 0', tierDescription: 'Tier Description', costShare: 'Copay', costVal: 'Copay'},
  {tierNumber: 'Tier 1', tierDescription: 'Tier Description', costShare: 'Co-Insurance', costVal: 'Co-Insurance'},
  {tierNumber: 'Tier 2', tierDescription: 'Tier Description', costShare: 'Copay', costVal: 'Copay'},
  {tierNumber: 'Tier 3', tierDescription: 'Tier Description', costShare: 'Copay', costVal: 'Copay'},
  {tierNumber: 'Tier 4', tierDescription: 'Tier Description', costShare: 'Co-Insurance', costVal: 'Co-Insurance'},
  {tierNumber: 'Tier 5', tierDescription: 'Tier Description', costShare: 'Copay', costVal: 'Copay'},
  {tierNumber: 'Tier 6', tierDescription: 'Tier Description', costShare: 'Copay', costVal: 'Copay'}
]
class MarketingMaterial extends Component {
  state = {
    activeListIndex: 0,
  };

  updateListAndIndex = (index) => {
    this.setState({
      activeListIndex: index,
    });
  };
  renderActiveListContent = (): JSX.Element => {
    const listIndex = this.state.activeListIndex;
    switch (listIndex) {
      case 0:
        return <MaterialSearchTool />;
      case 1:
        return <PlainLanguageDescriptor />
      case 2:
        return <SearchToolConfiguration />;
      case 3:
        return <CostShareDetails costShareData={costShareData}/>;
      default:
        return <></>;
    }
  };
  render() {
    return (
      <Fragment>
      <div className="_marketing-material-root">
        <CustomAccordion name="CONFIGURATION">
          <Grid container className="reset">
            <Grid
              xs={3}
              className="border-right"
              alignContent="flex-start"
              key={0}
              item
            >
              <List>
                <ListItem
                  key={0}
                  className={
                    this.state.activeListIndex == 0
                      ? "marketing-material-list__item--active"
                      : "marketing-material-list__item"
                  }
                  onClick={() => this.updateListAndIndex(0)}
                >
                  <ListItemText
                    className={
                      this.state.activeListIndex == 0
                        ? "marketing-material-list__item__text--active"
                        : "marketing-material-list__item__text"
                    }
                  >
                    Material and Search Tool legend
                  </ListItemText>
                </ListItem>
                <ListItem
                  key={0}
                  className={
                    this.state.activeListIndex == 1
                      ? "marketing-material-list__item--active"
                      : "marketing-material-list__item"
                  }
                  onClick={() => this.updateListAndIndex(1)}
                >
                  <ListItemText
                    className={
                      this.state.activeListIndex == 1
                        ? "marketing-material-list__item__text--active"
                        : "marketing-material-list__item__text"
                    }
                  >
                    Plain Language Descriptors
                  </ListItemText>
                </ListItem>
                <ListItem
                  key={0}
                  className={
                    this.state.activeListIndex == 2
                      ? "marketing-material-list__item--active"
                      : "marketing-material-list__item"
                  }
                  onClick={() => this.updateListAndIndex(2)}
                >
                  <ListItemText
                    className={
                      this.state.activeListIndex == 2
                        ? "marketing-material-list__item__text--active"
                        : "marketing-material-list__item__text"
                    }
                  >
                    Search Tool Configuration
                  </ListItemText>
                </ListItem>
                <ListItem
                  key={0}
                  className={
                    this.state.activeListIndex == 3
                      ? "marketing-material-list__item--active"
                      : "marketing-material-list__item"
                  }
                  onClick={() => this.updateListAndIndex(3)}
                >
                  <ListItemText
                    className={
                      this.state.activeListIndex == 3
                        ? "marketing-material-list__item__text--active"
                        : "marketing-material-list__item__text"
                    }
                  >
                    Cost-Share Details
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>

            <Grid className="" item xs={9} direction="column">
              <Container>{this.renderActiveListContent()}</Container>
            </Grid>
          </Grid>
        </CustomAccordion>
      </div>
      <MarketingMaterialTable />
    </Fragment>
    );
  }
}

export default MarketingMaterial;
