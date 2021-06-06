import TabLink from "@/components/TabLink.vue";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/TabLink",
  component: TabLink,
};

const Template = (args) => ({
  components: { TabLink },
  setup() {
    return {
      args,
      onClose: action("closed"),
      onSelect: action("selected"),
    };
  },
  template: `<TabLink v-bind="args" @close="onClose" @select="onSelect"/>`,
});

import img from "./assets/16.png";

export const Primary = Template.bind({});
Primary.args = {
  favIconUrl: img,
  title: "Page Title",
};

export const Active = Template.bind({});
Active.args = {
  id: 2,
  favIconUrl: img,
  title: "Active Tab",
  active: true,
};

export const Discarded = Template.bind({});
Discarded.args = {
  id: 2,
  favIconUrl: img,
  title: "Discarded Tab",
  discarded: true,
};

export const Pinned = Template.bind({});
Pinned.args = {
  id: 2,
  favIconUrl: img,
  title: "Pinned Tab",
  pinned: true,
};

export const Attention = Template.bind({});
Attention.args = {
  id: 2,
  favIconUrl: img,
  title: "Look at me",
  attention: true,
};

export const MissingIcon = Template.bind({});
MissingIcon.args = {
  id: 2,
  title: "Active Tab",
};
