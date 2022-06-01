import type { Component } from 'solid-js';
import { createSignal, onCleanup, createMemo } from "solid-js";

import logo from './logo.svg';
import { Pyramid } from './components/pyramid'
import styles from './App.module.css';

export enum Gender { Male, Female }

class Cohort {

  constructor(age: number, gender: Gender, population: number = 100) {
    this.age = age;
    this.population = population;
    this.gender = gender;
  }

  gender: Gender;
  age: number;
  population: number;
}

const App: Component = () => {

  const [people, setPeople] = createSignal([
    new Cohort(0, Gender.Male),
    new Cohort(0, Gender.Female),
    new Cohort(5, Gender.Male),
    new Cohort(5, Gender.Female),
    new Cohort(10, Gender.Male),
    new Cohort(10, Gender.Female),
    new Cohort(15, Gender.Male),
    new Cohort(15, Gender.Female),
    new Cohort(20, Gender.Male),
    new Cohort(20, Gender.Female),
    new Cohort(25, Gender.Male),
    new Cohort(25, Gender.Female),
    new Cohort(30, Gender.Male),
    new Cohort(30, Gender.Female),
    new Cohort(35, Gender.Male),
    new Cohort(35, Gender.Female),
    new Cohort(40, Gender.Male),
    new Cohort(40, Gender.Female),
    new Cohort(45, Gender.Male),
    new Cohort(45, Gender.Female),
    new Cohort(50, Gender.Male),
    new Cohort(50, Gender.Female),
    new Cohort(55, Gender.Male),
    new Cohort(55, Gender.Female),
    new Cohort(60, Gender.Male),
    new Cohort(60, Gender.Female),
    new Cohort(65, Gender.Male),
    new Cohort(65, Gender.Female),
    new Cohort(70, Gender.Male),
    new Cohort(70, Gender.Female),
    new Cohort(75, Gender.Male),
    new Cohort(75, Gender.Female),
    new Cohort(80, Gender.Male),
    new Cohort(80, Gender.Female),
    new Cohort(85, Gender.Male),
    new Cohort(85, Gender.Female),
    new Cohort(90, Gender.Male),
    new Cohort(90, Gender.Female),
    new Cohort(95, Gender.Male),
    new Cohort(95, Gender.Female),
  ]);
  const population = createMemo(() => getPopulation())

  function getPopulation():number {
    var i = 0;
    for(var cohort in people()) {
      i += people()[cohort].population;
    }
    return i;
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>Popusim™</h1>
      </header>
      <Pyramid people={people()} />
    </div>
  );
};

export default App;
