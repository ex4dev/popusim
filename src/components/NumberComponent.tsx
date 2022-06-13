import { Component } from "solid-js"

import styles from "./../assets/styles/NumberComponent.module.css"

export const NumberComponent: Component = (props) => {
    return (
        <div>
            <button class={styles.button} onclick={() => {
                props.setter(props.number + props.increment)
            }}>⬆</button>
            <span style={{
                display: "inline-block",
                "min-width": "50px",
                "text-align": "center"
            }}>{Math.round(props.number * 1000) / 1000}</span>
            <button class={styles.button} onclick={() => {
                props.setter(props.number - props.increment)
            }}>⬇</button>
            <span>{props.name}</span>
        </div>
    )
}
