import { Component, For } from "solid-js";
import { Properties } from "solid-js/web";
import { Gender } from "../App";

export const Pyramid : Component = (props) => {

    let totalPopulation = {}
    for(let i in props.people) {
        let cohort = props.people[i];
        totalPopulation[cohort.gender] = (totalPopulation[cohort.gender] || 0) + cohort.population;
    }

    return (
        <div>
            <p>population pyramid goes here(todo)</p>
            <div class="pyramid" style={{display: "grid", "row-gap": "10px", "margin": "auto", "grid-template-areas": "'bar1 bar2' 'bar3 bar4'"}}>
            <For each={props.people}>{(cohort, i) =>
                <div class="bar" style={{
                    background: cohort.gender == Gender.Male ? "lightblue" : "pink",
                    width: (cohort.population / totalPopulation[cohort.gender] * 100) + "%",
                    height: "10px",
                    marginTop: "10px",
                    display: "inline-block",
                    "grid-area": (i() / 2 + 1) + " / " + (cohort.gender == Gender.Male ? "1" : "2")  + " / span 1 / span 1",
                    "align-self": (cohort.gender == Gender.Male ? "end" : "start")
                }}></div>
            }</For>
            </div>
        </div>
    )
}