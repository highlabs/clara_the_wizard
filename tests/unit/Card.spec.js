import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import Card from '@/components/Card.vue'

describe('Card.vue', () => {
  it('render only first letter', () => {
    const wrapper = mount(Card, {
      propsData: {
        value: 'KING'
      }
    })
    const span = wrapper.findAll('span')
    expect(span.at(0).text()).toMatch('K')
    expect(span.at(1).text()).toMatch('K')
  })

  it('render suits images', () => {
    const mockURI = '../assets/spades.svg'
    const wrapper = mount(Card, {
      propsData: {
        suit: 'HEARTS'
      }
    })

    sinon.stub(wrapper.vm, 'getSuitURI').returns(mockURI)

    const result = wrapper.vm.getSuitURI()

    expect(result).toBe(mockURI)
  })
})
