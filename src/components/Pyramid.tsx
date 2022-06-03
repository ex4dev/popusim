import { Component, For, Show, createMemo, Accessor, Index } from "solid-js";
import { Gender, Cohort } from "../App";
import styles from './../App.module.css';

export const Pyramid: Component = (props: any | { people: Array<Cohort> }) => {

    const cohorts = createMemo(() => {
        let temp: { [key: number]: Array<Cohort> } = {};
        for (let i in props.people) {
            const cohort = props.people[i];
            if (!temp[cohort.age]) {
                temp[cohort.age] = [];
            }
            temp[cohort.age].push(cohort);
        }
        return temp;
    });

    const cohortsByAge = createMemo(() => Object.keys(cohorts()).reverse())

    const maxWidth = createMemo(() => {
        let temp = 0;
        for (let i in props.people) {
            temp = Math.max(temp, props.people[i].percentage(props.people))
        }
        return temp;
    });

    return (
        <table class={styles.pyramid} style={{ display: "block", "row-gap": "10px", "margin": "auto", "min-width": "400px" }}>
            <Index each={cohortsByAge()}>{(ageGroup: Accessor<number>, index: number) =>
                <tr>
                    <Index each={cohorts()[ageGroup()]}>{(cohort: Accessor<Cohort>, i: number) =>
                        <>
                            <td title={
                                ["Men", "Women"][cohort().gender] + " aged " + cohort().age + "-" + (+cohort().age + 5) + "\n" +
                                cohort().percentage(props.people).toPrecision(5) + "% of total\n" +
                                cohort().population.toLocaleString("en-US") + " people"
                            }>
                                <div class="bar" style={{
                                    background: cohort().gender == Gender.Male ? "lightblue" : "pink",
                                    width: (cohort().percentage(props.people) / maxWidth() * 150) + "px",
                                    height: "20px",
                                    display: "block",
                                    "margin-left": cohort().gender == Gender.Male ? "auto" : "initial",
                                    "text-align": cohort().gender == Gender.Male ? "left" : "right",
                                    "transition": "0.4s ease",
                                    "will-change": "width"
                                }}>
                                    <Show when={cohort().percentage(props.people) > 1}>
                                        <span style={{ color: "black" }}>
                                            {Math.round(cohort().percentage(props.people) * 10) / 10}%
                                        </span>
                                    </Show>
                                </div>
                            </td>
                            <Show when={i === 0}>
                                <td style={{ "text-align": "center" }}>
                                    <span class="bar-label">{ageGroup} - {+ageGroup() + 5}</span>
                                </td>
                            </Show>
                        </>
                    }</Index>
                </tr>
            }</Index>
        </table>
    )
}
