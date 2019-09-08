import { mount } from '@vue/test-utils'
import ClaraIntroduction from '@/components/ClaraIntroduction.vue'
describe('ClaraIntroduction.vue', () => {
  it('continue and start buttons steps', () => {
    const wrapper = mount(ClaraIntroduction, {
      propsData: { claraSteps: 0 }
    })
    const speechLength = wrapper.vm.claraText.length - 1

    expect(wrapper.find({ ref: 'continueButton' }).exists()).toBe(true)
    expect(wrapper.find({ ref: 'startButton' }).exists()).toBe(false)

    wrapper.setProps({ claraSteps: speechLength })

    expect(wrapper.find({ ref: 'continueButton' }).exists()).toBe(false)
    expect(wrapper.find({ ref: 'startButton' }).exists()).toBe(true)
  })
})
