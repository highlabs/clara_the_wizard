import { shallowMount } from '@vue/test-utils'
import BoxText from '@/components/BoxText.vue'

describe('BoxText.vue', () => {
  it('renders props.text when passed', () => {
    const text = 'Mussum Ipsum'
    const wrapper = shallowMount(BoxText, {
      propsData: { text }
    })
    expect(wrapper.text()).toMatch(text)
  })
})
