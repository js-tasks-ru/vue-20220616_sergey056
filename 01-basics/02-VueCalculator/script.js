import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const operations = [
  {
    name: 'sum',
    operator: '➕',
    handler: (a, b) => a + b,
  },
  {
    name: 'subtract',
    operator: '➖',
    handler: (a, b) => a - b,
  },
  {
    name: 'multiply',
    operator: '✖',
    handler: (a, b) => a * b,
  },
  {
    name: 'divide',
    operator: '➗',
    handler: (a, b) => a / b,
  },
];

const App = defineComponent({
  name: 'App',
  data() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      operations: null,
      selectedOperation: null,
    };
  },
  computed: {
    resultNumber() {
      let operation = this.operations.filter((value) => value.name === this.selectedOperation);
      if (operation.length) {
        return operation[0].handler(this.firstNumber, this.secondNumber);
      } else {
        return 0;
      }
    },
  },
  created() {
    this.operations = operations;
    this.selectedOperation = operations[0].name;
  },
  template: `
    <div class="row">
    <div class="col">
      <input v-model="firstNumber" type="number"/>
    </div>

    <div class="col" style="display: flex; flex-direction: column; font-family: emoji">
      <label v-for="(operation) in operations">
        <input
          type="radio"
          name="operator"
          :value="operation.name"
          :checked="operation.name===selectedOperation"
          @input="selectedOperation=operation.name"
        />
         {{ operation.operator }}
      </label>
    </div>

    <div class="col">
      <input v-model="secondNumber" type="number"/>
    </div>

    <div class="col">=</div>

    <output class="col">{{ resultNumber }}</output>
    </div>
  `,
});

const app = createApp(App);
app.mount('#app');
