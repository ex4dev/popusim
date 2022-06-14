import { Component, Setter } from "solid-js"

import styles from "./../assets/styles/NumberComponent.module.css"

export const NumberComponent: Component = (props: any | { number: number, setter: Setter<number> }) => {
    return (
        <div>
            <button class={styles.button} onclick={() => {
                props.setter(props.number + props.increment)
            }}>⬆</button>
            <span class={styles.text}>{Math.round(props.number * 1000) / 1000}</span>
            <button class={styles.button} onclick={() => {
                props.setter(Math.max(0, props.number - props.increment))
            }}>⬇</button>
            <span>{props.name}</span>
        </div>
    )
}
