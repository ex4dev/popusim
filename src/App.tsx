import { Component, createSignal } from 'solid-js';

import { Pyramid } from './components/Pyramid'
import { Stats } from './components/Stats';
import styles from './App.module.css';
import { BottomButtons } from './components/BottomButtons';

export enum Gender { Male, Female }

export class Cohort {

  constructor(age: number, gender: Gender, population: number = age == 0 ? Math.round(Math.random() * 1000) : 0) {
    this.age = age;
    this.population = population;
    this.gender = gender;
  }

  gender: Gender;
  age: number;
  population: number;

  getTotalPopulation(gender: Gender, cohorts: Array<Cohort>): number {
    let total = 0;
    for (let cohort in cohorts) {
      total += cohorts[cohort].population;
    }
    return total;
  }

  percentage(cohorts: Array<Cohort>): number {
    return this.population / this.getTotalPopulation(this.gender, cohorts) * 100;
  }
}

const App: Component = () => {

  function getPeople(): Array<Cohort> {
    let list: Array<Cohort> = [];
    [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95].map((n) => {
      list.push(new Cohort(n, Gender.Male))
      list.push(new Cohort(n, Gender.Female))
    })
    return list;
  }

  const [people, setPeople] = createSignal(getPeople(), {equals: false});

  function getPopulation(): number {
    var i = 0;
    for (var cohort in people()) {
      i += people()[cohort].population;
    }
    return i;
  }

  function getPopulationInAgeRange(min: number, max: number): number {
    var i = 0;
    for (var cohort in people()) {
      if (people()[cohort].age >= min && people()[cohort].age <= max) {
        i += people()[cohort].population;
      }
    }
    return i;
  }

  const tick = function() {
    console.log("ticking")
    var ppl = people();
    for(let index in ppl) {
      let cohort = ppl[index];
      let aging = Math.ceil(cohort.population / 5); // 1/5 of the cohort moves up one year because they are tracked in 5-year intervals
      if(aging === 0) continue;
      cohort.population -= aging;
      let next = ppl[+index + 2];
      if(next !== undefined) {
        next.population += aging;
      }
    }
    setPeople(ppl);
  }

  setInterval(tick, 1000);

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>Popusim™</h1>
      </header>
      <Pyramid people={ people() } />
      <Stats people={people()}
       population={getPopulation()} 
       youngPopulation={getPopulationInAgeRange(0, 15)}
       workingPopulation={getPopulationInAgeRange(20, 60)}
       retiredPopulation={getPopulationInAgeRange(65, 95)} />
      <BottomButtons />
    </div>
  );
};

export default App;
