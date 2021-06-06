<script lang="ts">
import { defineComponent, h } from "vue";

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    let favicon;

    if (props.url) {
      const url = new URL(props.url);
      url.pathname = "/favicon.ico";
      favicon = url.toString();
    }

    return {
      favicon,
    };
  },

  render() {
    if (this.favicon) {
      return h("img", { src: this.favicon, height: 16 });
    }
    return undefined;
  },
});
</script>
