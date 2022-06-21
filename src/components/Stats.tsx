import { Component, createMemo } from "solid-js"
import { Cohort } from "../App"
import styles from "./../assets/styles/App.module.css"

export const Stats: Component = (props: any | { people: Array<Cohort>, population: number }) => {

    const avgAge = createMemo(() => {
        let total = 0, n = 0;
        for (const cohort of props.people) {
            total += cohort.age * cohort.population;
            n += cohort.population;
        }
        return Math.round(total / n * 100) / 100;
    })

    return (
        <div class={styles.stats}>
            <h1>Stats</h1>
            <ul>
                <li>Total Population: {props.population.toLocaleString('en-US')} {
                    props.populationTrend == 0 ? '➖' : (props.populationTrend == 1 ? '⬆️' : '⬇️')
                }</li>
                <ul>
                    <li>Young Population: {props.youngPopulation.toLocaleString('en-US')}</li>
                    <li>Working Population: {props.workingPopulation.toLocaleString('en-US')}</li>
                    <li>Retired Population: {props.retiredPopulation.toLocaleString('en-US')}</li>
                </ul>
                <li>Crude Birth Rate: {(props.births / (props.population / 1000)).toPrecision(4)} </li>
                <li>Crude Death Rate: {(props.deaths / (props.population / 1000)).toPrecision(4)} </li>
                <li>Average Age: {avgAge()}</li>
            </ul>
        </div>
    )
}
