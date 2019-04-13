import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import StoryRouter from "storybook-vue-router";

import Simple from "./Simple.vue";
import Double from "./Double.vue";
import List from "./List.vue";
import Accordion from "./Accordion.vue";
import Scale from "./Scale.vue";

import IconsHome from "./IconsHome.vue";
import IconsDetail from "./IconsDetail.vue";
import IconsRouterWrap from "./IconsRouterWrap.vue";

storiesOf("Routing", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#e6e6e6", default: true }]
  })
  .addDecorator(
    StoryRouter(
      {},
      {
        initialEntry: "/",
        routes: [
          { path: "/", component: IconsHome },
          { path: "/icons/:set", component: IconsDetail }
        ]
      }
    )
  )
  .add("Example", () => IconsRouterWrap);

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
  .add("Scale", () => {
    return {
      components: {
        Scale
      },
      template: `<Scale></Scale>`
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
