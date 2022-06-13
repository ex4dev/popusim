import { Component } from "solid-js"
import solidLogo from "./../assets/images/solidjs-logo.svg"
import githubLogo from "./../assets/images/github-logo.svg"

import styles from "./../assets/styles/Info.module.css"

export const Info: Component = () => {
    return (
        <div class={styles.info}>
            <h1>What is a Population Pyramid?</h1>
            <p>
                A population pyramid is a graphic used by demographers and geographers to determine demographic
                information about a country. It shows the population of each age group (also called a cohort)
                in a country compared to the other age groups. Then, males and females are divided to show
                other demographic trends.

                Population pyramids can help demographers understand the makeup of a country and can make
                inferences about recent events in a country's history, like a war, famine, epidemic, or
                a heavy demand for immigrant labor.
            </p>
            <h1>What are the metrics shown to the right of the pyramid?</h1>
            <b>Crude Birth Rate:</b><p>The amount of births per 1000 people in a country.</p>
            <b>Crude Death Rate:</b><p>The amount of deaths per 1000 people in a country.</p>
            <b>Shortcomings:</b>
            <p>
                Crude birth rate (CBR) and crude death rate (CDR) can give some useful information about a country,
                but these metrics typically don't tell the full story. This is why composite metrics like <b>total
                    fertility rate</b> (TFR) are used. This metric measures the amount of children born per woman,
                assuming every woman lives through her child-bearing years.
            </p>
            <h1>What do different pyramid shapes mean?</h1>
            <p><b>Pyramid</b>: A rapidly-growing country with a very young population. Typically represents a less-developed country.</p>
            <p><b>Inverted Pyramid</b>: A stage 4/5 country (see the <a href="https://en.wikipedia.org/wiki/Demographic_transition">DTM</a>);
                one that is declining in population and has a very high average age.</p>
            <p><b>Column</b>: A shape in between a pyramid and an inverted pyramid. These countries are more developed and have not started to decline.</p>
            <p><b>Asymmetric Shape</b>: Asymmetry can represent many things. For example, in the United Arab Emirates, there is a much greater
                population of men than women because of high demand for immigrant construction jobs in the country. Most of these people are
                temporary workers who will return home someday.</p>
            <p class={styles.credits}>
                Built with&nbsp;
                <a href="https://www.solidjs.com/"><img src={solidLogo} class={styles.solidLogo} /> SolidJS</a> &middot; View source on&nbsp;
                <a href="https://github.com/tylerswanson2/popusim"><img src={githubLogo} class={styles.githubLogo} /> GitHub</a> &middot; See&nbsp;🌎&nbsp;
                <a href="https://www.populationpyramid.net/">real-world examples</a> of population pyramids.
            </p>
        </div >
    )
}