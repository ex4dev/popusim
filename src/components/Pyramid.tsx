import { Component, For, Show, createMemo } from "solid-js";
import { Gender, Cohort } from "../App";
import styles from './../App.module.css';

export const Pyramid: Component = (props: any | { people: Array<Cohort> }) => {

    const cohorts = createMemo(() => {
        let temp = {};
        for(let i in props.people) {
            const cohort = props.people[i];
            if(!temp[cohort.age]) {
                temp[cohort.age] = [];
            }
            temp[cohort.age].push(cohort);
        }
        return temp;
    })

    const maxWidth = createMemo(() => {
        let temp = 0;
        for(let i in props.people) {
            temp = Math.max(temp, props.people[i].percentage(props.people))
        }
        return temp;
    })

    return (
        <table class={styles.pyramid} style={{ display: "block", "row-gap": "10px", "margin": "auto", "grid-auto-flow": "column" }}>
            <For each={Object.keys(cohorts()).reverse()}>{(ageGroup: number, i) =>
                <tr>
                    <For each={cohorts()[ageGroup]}>{(cohort: Cohort, i) =>
                        <>
                            <td>
                                <div class="bar" style={{
                                    background: cohort.gender == Gender.Male ? "lightblue" : "pink",
                                    width: (cohort.percentage(props.people) / maxWidth() * 150) + "px",
                                    height: "20px",
                                    display: "block",
                                    "margin-left": cohort.gender == Gender.Male ? "auto" : "initial",
                                    "text-align": cohort.gender == Gender.Male ? "left" : "right"
                                }}><span style={{ color: "black" }}>
                                        {Math.round(cohort.percentage(props.people))}%
                                    </span>
                                </div>
                            </td>
                            <Show when={i() == 0}>
                                <td style={{ "text-align": "center" }}>
                                    <span class="bar-label">{ageGroup} - {+ageGroup + 5}</span>
                                </td>
                            </Show>
                        </>
                    }</For>
                </tr>
            }</For>
        </table>
    )
}
