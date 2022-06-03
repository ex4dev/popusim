import { Component, createSignal, onCleanup, createMemo } from 'solid-js';

import { Pyramid } from './components/Pyramid'
import { Stats } from './components/Stats';
import { NewsTicker } from './components/NewsTicker';
import { Info } from './components/Info';
import { Events } from './components/BottomButtons';
import { NumberComponent } from './components/NumberComponent';

import styles from './App.module.css';

export enum Gender { Male, Female }

export class Cohort {

  constructor(age: number, gender: Gender, population: number = age === 0 ? 1000000 : 0) {
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

export interface Event {
  type: EventType;
  duration: number;
}

export enum EventType {
  War, BabyBoom
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

  const [people, setPeople] = createSignal(getPeople(), { equals: false });
  const [year, setYear] = createSignal(2022)
  const [populationTrend, setPopulationTrend] = createSignal(1);
  const [newsStory, setNewsStory] = createSignal("");
  const [events, setEvents] = createSignal([]);

  // Statistics
  const [births, setBirths] = createSignal(0);
  const [deaths, setDeaths] = createSignal(0);
  const [childbearers, setChildbearers] = createSignal(0);

  // Values related to population change over time
  const [deathRate, setDeathRate] = createSignal(0.01);
  const [birthRate, setBirthRate] = createSignal(0.04);
  const [immigrants, setImmigrants] = createSignal(1000);
  const [emigrants, setEmigrants] = createSignal(200);
  const [imr, setIMR] = createSignal(0.55);

  const setEvent = (type: EventType, ticks: number) => {
    let e: Array<Event> = events();
    e.push({ type: type, duration: ticks });
    setEvents(e);
  }

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

  const processEvents = () => {
    let births = 0, deaths = 0;
    for (const event of events()) {
      event.duration--;
      console.log("processing event " + event);
      if (event.duration <= 0) {
        let e: Array<Event> = events();
        e.splice(e.indexOf(event), 1);
        setEvents(e);
        setNewsStory("");
        console.log(`Event ended: ${event}; type ${event.type}`)

        if (event.type == EventType.War) {
          setEvent(EventType.BabyBoom, 10);
        }
        continue;
      }
      if (event.type == EventType.War) {
        setNewsStory("War has broken out!");
        for (const cohort of people()) {
          if (cohort.age > 15 && cohort.age < 30 && cohort.gender == Gender.Male) {
            const factor = 0.25;
            deaths += cohort.population / (1 / factor);
            cohort.population *= factor;
          }
        }
      } else if (event.type == EventType.BabyBoom) {
        setNewsStory("After the war, people are having many more kids!")
        for (const cohort of people()) {
          if (cohort.age > 15 && cohort.age < 45) {
            births += cohort.population * birthRate();
            cohort.population += cohort.population * birthRate();
          }
        }
      }
    }
    return { eventBirths: births, eventDeaths: deaths };
  }

  const tick = function () {
    const previousPopulation = getPopulation();
    let births = 0;
    let deaths = 0;
    let childbearers = 0;

    setYear(year() + 1)

    // Process Aging
    for (let index in people()) {
      let cohort = people()[index];
      let aging = Math.ceil(cohort.population / 5); // 1/5 of the cohort moves up one year because they are tracked in 5-year intervals
      if (aging === 0) continue;
      cohort.population -= aging;
      let next = people()[+index + 2];
      if (next !== undefined) {
        next.population += aging;
      } else deaths++;
    }

    // Process Death
    for (const cohort of people()) {
      const rate = (cohort.gender == Gender.Male) ? deathRate() * 1.2 : deathRate()
      const before = cohort.population;
      cohort.population *= (1 - cohort.age / (1 / rate * 10))
      deaths += (before - cohort.population);
    }

    // Process Birth Rates and Infant Mortality
    for (const cohort of people()) {
      if (cohort.age >= 20 && cohort.age <= 45 && cohort.gender == Gender.Female) {
        people()[0].population += birthRate() * cohort.population;
        people()[1].population += birthRate() * cohort.population;
        births += birthRate() * cohort.population * 2;
        childbearers += (cohort.gender == Gender.Female) ? cohort.population : 0;
      }
      if (cohort.age == 0) {
        cohort.population *= (1 - imr() / 5);
        deaths += (imr() / 5);
      }
    }

    // Process Immigration/Emigration
    const totalImmigrants = immigrants() * Math.random();
    const totalEmigrants = emigrants() * Math.random();
    for (const cohort of people()) {
      if (cohort.age >= 20 && cohort.age <= 30) {
        cohort.population += cohort.gender == Gender.Female ? totalImmigrants * 0.5 : totalImmigrants;
      } else if (cohort.age >= 15 && cohort.age <= 25) {
        cohort.population -= cohort.gender == Gender.Female ? totalEmigrants * 0.5 : totalEmigrants;
      }
    }

    // Process the current event(s).
    const { eventBirths, eventDeaths } = processEvents();
    births += eventBirths;
    deaths += eventDeaths;

    // Make sure all cohorts never have a negative number of people or a decimal number of people.
    for (const cohort of people()) {
      cohort.population = Math.floor(cohort.population < 0 ? 0 : cohort.population);
    }

    // Force the array to update and cause components to re-render
    setPeople(people())

    // Set information required for population statistics
    const diff = getPopulation() - previousPopulation
    setPopulationTrend(Math.abs(diff) < 5000 ? 0 : (diff > 0 ? 1 : -1))
    setBirths(births);
    setDeaths(deaths);
    setChildbearers(childbearers);
  }

  const isAlive = createMemo(() => {
    for (const cohort of people()) {
      if (cohort.population > 0) return true;
    }
    return false;
  });

  const tickTimer = setInterval(tick, 750);

  onCleanup(() => clearInterval(tickTimer));

  return (
    <>
      <Show when={isAlive()}>
        <NewsTicker newsStory={newsStory()} />
        <div class={styles.App}>
          <header class={styles.header}>
            <h1>Popusim™ - {year()}</h1>
          </header>
          <Pyramid people={people()} />
          <Stats people={people()}
            populationTrend={populationTrend()}
            population={getPopulation()}
            youngPopulation={getPopulationInAgeRange(0, 15)}
            workingPopulation={getPopulationInAgeRange(20, 60)}
            retiredPopulation={getPopulationInAgeRange(65, 95)}
            births={births()}
            deaths={deaths()}
            childbearers={childbearers()} />
          <Events people={people()}
            setEvent={setEvent}
            tick={tick}
            setBirthRate={setBirthRate}
            setDeathRate={setDeathRate}
            setImmigration={setImmigrants}
            setEmigration={setEmigrants}
            setIMR={setIMR}
            population={getPopulation()}
             />
          <div class={styles.numbers}>
            <NumberComponent number={birthRate()} setter={setBirthRate} increment={0.01} name="Birth Rate" />
            <NumberComponent number={deathRate()} setter={setDeathRate} increment={0.01} name="Death Rate" />
            <NumberComponent number={immigrants()} setter={setImmigrants} increment={100} name="Immigrants" />
            <NumberComponent number={emigrants()} setter={setEmigrants} increment={100} name="Emigrants" />
            <NumberComponent number={imr()} setter={setIMR} increment={0.05} name="Infant Mortality" />
          </div>
          <Info />
        </div>
      </Show>
      <Show when={!isAlive()}>
        <div class={styles.App}>
          <header class={styles.header}>
            <h1>You Failed!</h1>
            <p>Somehow you managed to make your whole country die. Great job!</p>
          </header>
        </div>
      </Show>
    </>
  );
};

export default App;
