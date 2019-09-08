import { shallowMount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button.vue', () => {
  it('renders props.text when passed', () => {
    const text = 'Mussum Ipsum'
    const wrapper = shallowMount(Button, {
      propsData: { text }
    })
    expect(wrapper.text()).toMatch(text)
  })

  it('button click emit', () => {
    const wrapper = shallowMount(Button)

    wrapper.findAll('button').at(0).trigger('click')
    expect(wrapper.emitted('onClick')).toBeTruthy()
  })
})
