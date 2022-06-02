import { Component, For, Show } from "solid-js";
import { Gender, Cohort } from "../App";
import styles from './../App.module.css';

export const Pyramid: Component = (props: any | { people: Array<Cohort> }) => {

    let cohortsByAgeGroup: { [index: number]: Array<Cohort> } = {};
    for (let i in props.people) {
        let cohort = props.people[i];
        cohortsByAgeGroup[cohort.age] = [...cohortsByAgeGroup[cohort.age] ?? [], cohort]
    }

    return (
        <table class={styles.pyramid} style={{ display: "block", "row-gap": "10px", "margin": "auto", "grid-auto-flow": "column" }}>
            <For each={Object.keys(cohortsByAgeGroup)}>{(ageGroup: number, i) =>
                <tr>
                    <For each={cohortsByAgeGroup[ageGroup]}>{(cohort: Cohort, i) =>
                        <>
                            <td>
                                <div class="bar" style={{
                                    background: cohort.gender == Gender.Male ? "lightblue" : "pink",
                                    width: cohort.percentage(props.people) * 30 + "px",
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
