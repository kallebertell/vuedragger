import Vue from 'vue';
import OlxButton from '@/components/OlxButton';

describe('OlxButton.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: `
        <div>
          <olx-button :onClick="onClick">
            <span>42</span>
          </olx-button>
        </div>
      `,
      methods: {
        onClick() {
        },
      },
      components: {
        'olx-button': OlxButton,
      },
    }).$mount();
    expect(vm.$el.querySelector('div button span').textContent).to.equal('42');
  });
});
