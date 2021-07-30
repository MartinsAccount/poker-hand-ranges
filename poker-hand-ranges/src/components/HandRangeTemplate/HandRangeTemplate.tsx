import { makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { MainStore } from "../../stores/MainStore";
import styles from "./HandRangeTemplate.module.scss";

// [{
//     name: "sb",
//     stack: 25,
//     action: "limp",
//     versus: "btn",
// },
// {
//     name: "btn",
//     stack: 60,
//     action: "raise",
//     versus: "utg1",
// },
// ];

const PFI_STRATEGY = [
  {
    name: "sb",
    stack: 25,
    action: "limp",
    versus: "btn",
  },
  {
    name: "btn",
    stack: 60,
    action: "raise",
    versus: "utg1",
  },
];

const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

// const handRange = [
//     {
//         hand: "AA",
//     },
// ];

interface IHandRangeTemplateProps {
  MainStore?: MainStore;
}

@inject("MainStore")
@observer
export default class HandRangeTemplate extends Component<IHandRangeTemplateProps> {
  handRange = [];

  constructor(props: any) {
    super(props);

    makeObservable(this);
  }

  render() {
    this.props.MainStore!.createRange();

    return (
      <div>
        {this.props.MainStore!.handRange.map((row) => (
          <div className={styles.row}>
            {row.map((cell) => (
              <div
                // onClick={() => this.changeHandRange(cell.card)}
                className={`${styles.cardCell} ${
                  cell.clicked ? styles.clicked : null
                }`}
              >
                {cell.card}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
