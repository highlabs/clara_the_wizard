import { mount } from '@vue/test-utils'
import ClaraIntroduction from '@/components/ClaraIntroduction.vue'
describe('ClaraIntroduction.vue', () => {
  it('continue button exists', () => {
    const wrapper = mount(ClaraIntroduction, {
      propsData: { claraSteps: 0 }
    })

    expect(wrapper.find({ ref: 'continueButton' }).exists()).toBe(true)
  })

  it('start button exists', () => {
    const wrapper = mount(ClaraIntroduction)
    const speechLength = wrapper.vm.claraText.length - 1

    wrapper.setProps({ claraSteps: speechLength })

    expect(wrapper.find({ ref: 'startButton' }).exists()).toBe(true)
  })
})
