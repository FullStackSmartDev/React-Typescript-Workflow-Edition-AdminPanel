import React from 'react';
import ReactDragListView from 'react-drag-listview/lib/index.js';
import { Input } from "antd";
import Button from '../../shared/Frx-components/button/Button';

interface prioritizeAlternativesState{
    data: any;
}
interface SimpleSearchState {
    searchText: string;
}
interface SimpleSearchProps {
    onSearch: (searchObject: SimpleSearchState) => void;
}
const prioData = [
    {rxcui: 8, labels: '12 Hour Nasal Spray Solution 0.05%'},
    {rxcui: 583, labels: 'Afrin Nasal Spray Nasal Solution 0.05%' },
    {rxcui: 520, labels: 'Adrenalin Nasal Solution 0.1%'},
    {rxcui: 520, labels: 'A.E.R. Witch Hazel External Pad'},
    {rxcui: 520, labels: 'Aluminum Acetate External Solution'},
    {rxcui: 520, labels: 'Calamine Phenolated External Lotion'},
    {rxcui: 520, labels: 'Delazinc External Ointment'},
    {rxcui: 520, labels: 'Diaper Rash External Ointment 40%'},
]
class prioritizeAlternatives extends React.Component<any,any> {
    state = {
        searchText: '',
        data: [],
        filteredData: [],
        isFetchingData: false
    }
    componentDidMount(){
        this.setState({
            data: prioData,
            filteredData: prioData
        })
    }
    deleteItemHandler = (index) => {
        console.log(`delete item number ${index}`)
    }
    handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (
            (e && e.target && e.target.value) ||
            (e && e.target && e.target.value === "")
        ) {
            const key = e.currentTarget.name;
            let value = e.target.value;

            if (Object.keys(this.state).includes(key)) {
                this.setState({ ...this.state, [key]: value } as Pick<
                    SimpleSearchState,
                    keyof SimpleSearchState
                >);
            }
            this.onSearch(value)
        }
    };
    onSearch = (text: string) => {
        this.handleSearch({ searchText: text });
    };
    handleSearch = (searchObject: any) => {
        this.setState({ isFetchingData: true });
        if (searchObject) {
            const newData = this.state.data.filter((item: any) =>
              Object.keys(item)
                .map((_item: any) =>
                  item[_item]
                    .toString()
                    .toLocaleLowerCase()
                    .includes(searchObject.searchText)
                )
                .includes(true)
            );
            this.setState({ isFetchingData: false, filteredData: newData });
        } else {
          this.setState({ isFetchingData: false });
        }
    };
    render() {
      const that = this;
      const dragProps = {
        onDragEnd(fromIndex, toIndex) {
          const data = [...that.state.data];
          const item = data.splice(fromIndex, 1)[0];
          data.splice(toIndex, 0, item);
          that.setState({ data });
        },
        nodeSelector: 'li',
        handleSelector: 'a'
      };
  
      return (
        <div className="prio-sec">
            <div className="border br-5">
                <div className="header space-between">
                    Prioritize Alternatives for selection above
                    <div className="search-wrapper">
                        <Input
                            className="simple-search__input simple-search__input--text"
                            onChange={this.handleInputChange}
                            value={this.state.searchText}
                            placeholder="Search Alternative"
                            name="searchText"
                            prefix={
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7ZM7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5C8.61495 13.5 10.0923 12.911 11.2291 11.9362L14.6464 15.3536C14.8417 15.5488 15.1583 15.5488 15.3536 15.3536C15.5488 15.1583 15.5488 14.8417 15.3536 14.6464L11.9362 11.2291C12.911 10.0923 13.5 8.61495 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5Z" fill="#999999" />
                                </svg>
                            }
                        />
                        <Button className="Button add-btn" label="Add"/>
                    </div>
                </div>
                <div className="p-20">
                    <p className="static-text">Add or remove additional alternatives. Drag and drop to set priority order.</p>
                    <p className="static-text">All alternatives below will be applied as final alternatives for drugs selected when the alternative drug is covered on each formulary.</p>
                    <div className="border">
                        <div className="prio-grid heading">
                            <ul>
                                <li>
                                    <div className="alter-prio">alternative Priority</div>
                                    <div className="rxcui">RXCUI</div>
                                    <div className="label-names">label names</div>
                                    <div className="delete">delete</div>
                                </li>
                            </ul>
                        </div>
                        <div className="prio-grid prio-data">
                            <ReactDragListView {...dragProps}>
                                <ul>
                                    {this.state.filteredData.map((item:any, index) => (
                                    <li key={index}>
                                        <div className="alter-prio">{index}</div>
                                        <div className="rxcui">{item.rxcui}</div>
                                        <div className="label-names">{item.labels}</div>
                                        <div className="delete">
                                            <span>
                                                <svg onClick={() => this.deleteItemHandler(index)} width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.75 10.875C0.75 11.5625 1.3125 12.125 2 12.125H7C7.6875 12.125 8.25 11.5625 8.25 10.875V3.375H0.75V10.875ZM8.875 1.5H6.6875L6.0625 0.875H2.9375L2.3125 1.5H0.125V2.75H8.875V1.5Z" fill="#AAAAAA"/>
                                                </svg>
                                            </span>
                                        </div>
                                        <a href="#" className="dragable-icon">
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.208 6.41113L11.2142 4.83769C11.1976 4.82457 11.1775 4.81641 11.1564 4.81415C11.1353 4.81189 11.114 4.81563 11.0949 4.82492C11.0758 4.83422 11.0598 4.8487 11.0485 4.86671C11.0373 4.88472 11.0314 4.90553 11.0314 4.92675V5.93769H7.56269V2.46894H8.57519C8.66894 2.46894 8.72206 2.35956 8.66425 2.28613L7.08925 0.292376C7.07882 0.278884 7.06545 0.267962 7.05014 0.260446C7.03484 0.252931 7.01802 0.249023 7.00097 0.249023C6.98392 0.249023 6.9671 0.252931 6.95179 0.260446C6.93649 0.267962 6.92311 0.278884 6.91269 0.292376L5.33769 2.28613C5.32456 2.30281 5.31641 2.32285 5.31415 2.34395C5.31189 2.36505 5.31562 2.38637 5.32492 2.40545C5.33421 2.42453 5.3487 2.4406 5.36671 2.45183C5.38472 2.46306 5.40553 2.46899 5.42675 2.46894H6.43769V5.93769H2.96894V4.92519C2.96894 4.83144 2.85956 4.77831 2.78613 4.83613L0.792376 6.41113C0.778884 6.42155 0.767962 6.43493 0.760446 6.45023C0.752931 6.46554 0.749023 6.48236 0.749023 6.49941C0.749023 6.51646 0.752931 6.53328 0.760446 6.54858C0.767962 6.56389 0.778884 6.57726 0.792376 6.58769L2.78456 8.16269C2.858 8.2205 2.96738 8.16894 2.96738 8.07363V7.06269H6.43612V10.5314H5.42362C5.32987 10.5314 5.27675 10.6408 5.33456 10.7143L6.90956 12.7064C6.95487 12.7643 7.04237 12.7643 7.08612 12.7064L8.66112 10.7143C8.71894 10.6408 8.66737 10.5314 8.57206 10.5314H7.56269V7.06269H11.0314V8.07519C11.0314 8.16894 11.1408 8.22206 11.2142 8.16425L13.2064 6.58925C13.2199 6.57868 13.2308 6.56522 13.2383 6.54987C13.2459 6.53452 13.2499 6.51767 13.25 6.50056C13.2502 6.48346 13.2465 6.46654 13.2392 6.45106C13.2319 6.43558 13.2213 6.42193 13.208 6.41113Z" fill="#707683"></path></svg>
                                        </a>
                                    </li>
                                ))}
                                </ul>
                            </ReactDragListView>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }

export default prioritizeAlternatives;