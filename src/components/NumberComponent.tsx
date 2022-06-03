import { Component } from "solid-js"

export const NumberComponent: Component = (props) => {
    return (
        <div>
            <button onclick={() => {
                props.setter(props.number + props.increment)
            }}>⬆</button>
            <span style={{
                display: "inline-block",
                "min-width": "50px",
                "text-align": "center"
            }}>{Math.round(props.number * 1000) / 1000}</span>
            <button onclick={() => {
                props.setter(props.number - props.increment)
            }}>⬇</button>
            <span>{props.name}</span>
        </div>
    )
}
