import { Component, Show } from "solid-js";
import { EventType } from "../App";

import styles from "./../assets/styles/BottomButtons.module.css"

export const Events: Component = (props: any) => {

    return (
        <div class={styles.bottomButtons}>
            <h1>Policies</h1>
            <p>Presets for some of the available settings.</p>
            <button class={styles.button} onclick={() => {
                props.setBirthRate(0.06)
            }}>Pronatalist Policy</button>
            <button class={styles.button} onclick={() => {
                props.setBirthRate(0.03)
                props.setEmigration(1000)
            }}>Antinatalist Policy</button>
            <button class={styles.button} onclick={() => {
                props.setImmigration(6000)
            }}>Open-border Policy</button>
            <button class={styles.button} onclick={() => {
                props.setImmigration(100)
            }}>Closed-border Policy</button>
            <h1>Actions</h1>
            <button class={`${styles.button} ${styles.red}`} onclick={() => {
                props.setEvent(EventType.War, Math.floor(Math.random() * 5) + 3)
            }}>War</button>
            <button class={styles.button} onclick={() => {
                for(let i = 0; i < 10; i++) { props.tick(); }
            }}>Skip 10 Years</button>
            <button class={styles.button} onclick={() => {
                for(let i = 0; i < 100; i++) { props.tick(); }
            }}>Skip 100 Years</button>
            <button class={styles.button} onclick={() => {
                const total = props.population;
                const each = total / props.people.length;
                for(let i = 0; i < props.people.length; i++) {
                    props.people[i].population = Math.floor(Math.random() * each * 2);
                }
            }}>Randomize</button>
            <button class={styles.button} onclick={() => {
                const total = props.population;
                const each = total / props.people.length;
                for(let i = 0; i < props.people.length; i++) {
                    props.people[i].population = each;
                }
            }}>Uniform</button>
        </div>
    )
}
