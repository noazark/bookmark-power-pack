import Btn from "@/components/Btn.vue";
import IconX from "@/components/IconX.vue";
import IconLink from "@/components/IconLink.vue";
import { Tab } from "@/browser/tabs";

const icons = { IconX, IconLink };

export default {
  title: "Components/Buttons",
  component: Btn,
  argTypes: {
    icon: {
      options: Object.keys(icons), // An array of serializable values
      mapping: icons, // Maps serializable option values to complex arg values
      control: {
        type: "select", // Type 'select' is automatically inferred when 'options' is defined
      },
    },
  },
};

const Template = (args: Tab) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Btn },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args };
  },
  // Then, the spread values can be accessed directly in the template
  template: `<Btn v-bind="args"/>`,
});

export const Primary = Template.bind({});
Primary.args = { icon: "x", name: "foo" };
