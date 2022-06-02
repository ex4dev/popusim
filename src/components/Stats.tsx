import { Component } from "solid-js"
import { Cohort } from "../App"
import styles from "./../App.module.css"

export const Stats: Component = (props: any | { people: Array<Cohort>, population: number }) => {
    return (
        <ul class={styles.stats}>
            <li>Total Population: {props.population.toLocaleString('en-US')}</li>
            <ul>
                <li>Young Population: {props.youngPopulation.toLocaleString('en-US')}</li>
                <li>Working Population: {props.workingPopulation.toLocaleString('en-US')}</li>
                <li>Retired Population: {props.retiredPopulation.toLocaleString('en-US')}</li>
            </ul>
            <li>Crude Birth Rate:</li>
            <li>Crude Death Rate:</li>
            <ul>
                <li>Natural Causes:</li>
                <li>Preventable Deaths:</li>
            </ul>
            <li>Total Fertility Rate:</li>
        </ul>
    )
}
