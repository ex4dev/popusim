import { Component } from "solid-js";
import { Cohort } from "../App";

import styles from "./../App.module.css"

export const BottomButtons: Component = () => {
    return (
        <div class={styles.bottomButtons}>
            <button>Famine</button>
            <button>Epidemic</button>
            <button>Pronatalist Policy</button>
            <button>Antinatalist Policy</button>
            <button>Open-border Policy</button>
            <button>Closed-border Policy</button>
            <button class={styles.red}>War</button>
        </div>
    )
}