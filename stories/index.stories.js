import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Simple from "./Simple.vue";
import Double from "./Double.vue";
import List from "./List.vue";
import Accordion from "./Accordion.vue";

storiesOf("Examples", module)
  .add("Expanding Div", () => {
    return {
      components: {
        Simple
      },
      template: `<Simple></Simple>`
    };
  })
  .add("Two Divs", () => {
    return {
      components: {
        Double
      },
      template: `<Double></Double>`
    };
  })
  .add("List Shuffle", () => {
    return {
      components: {
        List
      },
      template: `<List></List>`
    };
  })
  .add("Accordion", () => {
    return {
      components: {
        Accordion
      },
      template: `<Accordion></Accordion>`
    };
  });
