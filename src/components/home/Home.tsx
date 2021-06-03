import React from "react";
import Call from "../call/Call";
import Claim from "../claim/Claim";
import BarChart from "../shapes/BarChart";
import PieChart from "../shapes/PieChart";
import Stepper from "../shapes/Stepper";
// import FrxBarChart from '../shared/FrxBarChart/FrxBarChart';
import FrxChart from "../shared/FrxChart/FrxChart";
import StatsSummary from "../shared/FrxStatsSummary/FrxStatsSummary";
import Task from "../task/Task";

const stepperConfig = [
  {
    name: "Deductible",
    value: 0,
    label: "1",
    stage: 1
  },
  {
    name: "Initial Coverage",
    value: 320,
    label: "2",
    stage: 2
  },
  {
    name: "Gap Coverage",
    value: 4200,
    label: "3",
    stage: 3
  },
  {
    name: "Catastrophic",
    value: 6250,
    label: "4",
    stage: 4
  }
];

const itemClicked = function() {
  console.log("item clicked");
};

class Home extends React.Component {
  render() {
    return (
      <div className="home-root">
        <h1> Home </h1>

        <div>
          <PieChart data={[15, 23, 24, 10]} total={4} />
          <div style={{ width: "500px" }}>
            <StatsSummary
              onSelectStatItem={() => {}}
              data={[15, 23, 24, 10]}
              labels={[
                "very long label very long label very long labelvery long labelvery long labelvery long labelvery long labelvery long labelvery long label",
                "L2",
                "L3",
                "L4"
              ]}
              total={4}
              heading={"Heading"}
            />
          </div>
        </div>
        <div>
          {/* <FrxBarChart
                      data={[{value: 1}, {value: 3}, {value: 5}, {value: 4}]}
                      title="Bar chart"
                      isSelected={false}
                      itemClicked={itemClicked}
                    /> */}
          <FrxChart
            onSelectStatItem={() => {}}
            data={{
              january: [
                {
                  key: "paid",
                  value: 20
                },
                {
                  key: "rejected",
                  value: 6
                }
              ],
              feburary: [
                {
                  key: "paid",
                  value: 12
                },
                {
                  key: "rejected",
                  value: 4
                }
              ],
              march: [
                {
                  key: "paid",
                  value: 30
                },
                {
                  key: "rejected",
                  value: 6
                }
              ],
              april: [
                {
                  key: "paid",
                  value: 10
                },
                {
                  key: "rejected",
                  value: 2
                }
              ],
              may: [
                {
                  key: "paid",
                  value: 20
                },
                {
                  key: "rejected",
                  value: 4
                }
              ],
              june: [
                {
                  key: "paid",
                  value: 3
                },
                {
                  key: "rejected",
                  value: 7
                }
              ],
              july: [
                {
                  key: "paid",
                  value: 5
                },
                {
                  key: "rejected",
                  value: 5
                }
              ],
              august: [
                {
                  key: "paid",
                  value: 11
                },
                {
                  key: "rejected",
                  value: 9
                }
              ],
              september: [
                {
                  key: "paid",
                  value: 0
                },
                {
                  key: "rejected",
                  value: 0
                }
              ],
              october: [
                {
                  key: "paid",
                  value: 1
                },
                {
                  key: "rejected",
                  value: 9
                }
              ],
              november: [
                {
                  key: "paid",
                  value: 0
                },
                {
                  key: "rejected",
                  value: 0
                }
              ],
              december: [
                {
                  key: "paid",
                  value: 0
                },
                {
                  key: "rejected",
                  value: 0
                }
              ]
            }}
          />
        </div>
        {/* <div>
                  <Stepper numStages={3} total={6250} currentValue={800} config={stepperConfig} />
                </div> */}
      </div>
    );
  }
}

export default Home;
