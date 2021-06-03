import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import Box from '@material-ui/core/Box';
import Button from "../../shared/Frx-components/button/Button";
import './PlainLanguageDescriptor.scss';

export default class PlainLanguageDescriptor extends React.Component<any, any> {
  render() {
    return (
      <div className="plain-language-container">
          <div className="list-wrapper">
            <Grid container>
                <Grid item xs={6}>
                    <div className="list-name-wrapper">
                        <Grid item xs={8}>
                        <div className="group">
                            <label>List Names</label>
                            <input type="text" className="base-input" />
                        </div>
                        </Grid>
                        <Grid item xs={3}>
                            <Box display="flex" justifyContent="flex-end" className="create-list-btn">
                                <Button label="Create List" />
                            </Box>
                        </Grid>
                        
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="list-name-wrapper">
                        <Grid item xs={8}>
                            <div className="group">
                                <label>
                                SELECTED LIST
                                </label>
                                <DropDown
                                className="list-dropdown"
                                options={[2018, 2019, 2020]}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <Box display="flex" justifyContent="flex-end" className="apply-btn">
                                <Button label="Apply" />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box display="flex" justifyContent="flex-end" className="apply-btn clone-btn">
                                <Button label="Clone" />
                            </Box>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="plain-language-grid-container">
                        <div className="plain-category">
                            <div className="plain-headings plain-border-bottm">Category</div>
                            <div className="plain-border-bottm plain-text plain-height">Override Category</div>
                            <div className="plain-border-bottm plain-text plain-height">Migraine Products</div>
                            <div className="plain-border-bottm plain-text plain-height"></div>
                            <div className="plain-border-bottm plain-text plain-height"></div>
                            <div className="plain-border-bottm plain-text plain-height">Override Category</div>
                        </div>
                        <div className="plain-category-desc">
                            <div className="plain-headings plain-border-bottm">Category descriptor</div>
                            <div className="plain-border-bottm plain-input plain-height"><input type="text" /></div>
                            <div className="plain-border-bottm plain-input plain-height"><input type="text" /></div>
                            <div className="plain-border-bottm plain-input plain-height"><input type="text" /></div>
                            <div className="plain-border-bottm plain-input plain-height"><input type="text" /></div>
                            <div className="plain-border-bottm plain-input plain-height"><input type="text" /></div>
                        </div>
                        <div className="plain-class">
                            <div className="plain-headings plain-border-bottm">class</div>
                            <div className="plain-border-bottm plain-text plain-height">Override Category</div>
                            <div className="plain-border-bottm plain-text plain-height">Antiperistaltic Agents</div>
                            <div className="plain-border-bottm plain-text plain-height">Override Class</div>
                            <div className="plain-border-bottm plain-text plain-height">Class</div>
                            <div className="plain-border-bottm plain-text plain-height">Override Category</div>
                        </div>
                        <div className="plain-class-desc">
                            <div className="plain-headings plain-border-bottm">class descriptor</div>
                            <div className="plain-border-bottm plain-input plain-height"><input type="text" /></div>
                            <div className="plain-border-bottm plain-input plain-height"><input type="text" /></div>
                            <div className="plain-border-bottm plain-input plain-height"><input type="text" /></div>
                            <div className="plain-border-bottm plain-input plain-height"><input type="text" /></div>
                            <div className="plain-border-bottm plain-input plain-height"><input type="text" /></div>
                        </div>
                    </div>
                </Grid>
            </Grid>
          </div>
      </div>
    );
  }
}
