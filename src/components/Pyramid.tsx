import { Component, Show, createMemo, Accessor, Index } from "solid-js";
import { Gender, Cohort } from "../App";
import styles from "./../assets/styles/Pyramid.module.css"

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

    // Get all keys of the cohorts map, reverse them, and convert them from strings to numbers.
    const cohortsByAge = createMemo(() => Object.keys(cohorts()).reverse().map((index) => +index));

    const maxWidth = createMemo(() => {
        let temp = 0;
        for (let i in props.people) {
            temp = Math.max(temp, props.people[i].percentage(props.people));
        }
        return temp;
    });

    const getClassName = (cohort: Cohort) => ["male", "female"][cohort.gender];

    const getTooltipText = (cohort: Cohort) => `${["Men", "Women"][cohort.gender]} aged ${cohort.age}-${+cohort.age + 5}\n` +
        `${cohort.percentage(props.people).toPrecision(5)}% of total\n` +
        `${cohort.population.toLocaleString("en-US")} people`

    return (
        <table class={styles.pyramid}>
            <Index each={cohortsByAge()}>{(ageGroup: Accessor<number>, index: number) =>
                <tr>
                    <Index each={cohorts()[ageGroup()]}>{(cohort: Accessor<Cohort>, i: number) =>
                        <>
                            <td title={getTooltipText(cohort())}>
                                <div class={`${styles.bar} ${styles[getClassName(cohort())]}`} style={{
                                    width: (cohort().percentage(props.people) / maxWidth() * 150) + "px"
                                }}>
                                    <Show when={cohort().percentage(props.people) > 1}>
                                        <span class={styles.barLabel}>
                                            {Math.round(cohort().percentage(props.people) * 10) / 10}%
                                        </span>
                                    </Show>
                                </div>
                            </td>
                            <Show when={i === 0}>
                                <td class={styles.cohortLabel}>
                                    {ageGroup} - {+ageGroup() + 5}
                                </td>
                            </Show>
                        </>
                    }</Index>
                </tr>
            }</Index>
        </table>
    )
}
