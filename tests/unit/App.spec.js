import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import ClaraIntroduction from '@/components/ClaraIntroduction.vue'
import axios from 'axios'
const MockAdapter = require('axios-mock-adapter')
const mock = new MockAdapter(axios)

describe('App.vue', () => {
  afterAll(() => mock.restore())
  beforeEach(() => mock.reset())

  it('check default data', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.vm.firstDeck).toEqual(null)
    expect(wrapper.vm.cards).toEqual([])
    expect(wrapper.vm.pile1).toEqual([])
    expect(wrapper.vm.pile2).toEqual([])
    expect(wrapper.vm.pile3).toEqual([])
    expect(wrapper.vm.step).toEqual(0)
    expect(wrapper.vm.mini).toEqual(true)
    expect(wrapper.vm.claraSteps).toEqual(0)
  })

  it('check show/hide of introductions', () => {
    const wrapper = shallowMount(App)
    const speechWrapper = shallowMount(ClaraIntroduction)
    const speechLength = speechWrapper.vm.claraText.length

    expect(wrapper.find({ ref: 'claraSteps' }).exists()).toBe(true)
    expect(wrapper.find({ ref: 'magicContainer' }).exists()).toBe(false)

    wrapper.setData({ claraSteps: speechLength })

    expect(wrapper.find({ ref: 'claraSteps' }).exists()).toBe(false)
    expect(wrapper.find({ ref: 'magicContainer' }).exists()).toBe(true)
  })

  it('deal cards', () => {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const pileResults1 = [
      1, 4, 7
    ]
    const pileResults2 = [
      2, 5, 8
    ]
    const pileResults3 = [
      3, 6, 9
    ]
    const wrapper = shallowMount(App)
    wrapper.setData({ cards })
    wrapper.vm.dealCards()
    const { pile1, pile2, pile3 } = wrapper.vm

    expect(pile1).toEqual(pileResults1)
    expect(pile2).toEqual(pileResults2)
    expect(pile3).toEqual(pileResults3)
  })

  it('deal cards without cards', async () => {
    const deckMock = {
      success: true,
      deck_id: 'd4timusdpdf5',
      shuffled: false,
      remaining: 52
    }
    const cardsMock = {
      'success': true,
      'deck_id': 'd4timusdpdf5',
      'remaining': 31,
      'cards': [{
        'value': 'ACE',
        'image': 'https://deckofcardsapi.com/static/img/AS.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/AS.svg',
          'png': 'https://deckofcardsapi.com/static/img/AS.png'
        },
        'code': 'AS'
      }, {
        'value': '2',
        'image': 'https://deckofcardsapi.com/static/img/2S.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/2S.svg',
          'png': 'https://deckofcardsapi.com/static/img/2S.png'
        },
        'code': '2S'
      }, {
        'value': '3',
        'image': 'https://deckofcardsapi.com/static/img/3S.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/3S.svg',
          'png': 'https://deckofcardsapi.com/static/img/3S.png'
        },
        'code': '3S'
      }, {
        'value': '4',
        'image': 'https://deckofcardsapi.com/static/img/4S.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/4S.svg',
          'png': 'https://deckofcardsapi.com/static/img/4S.png'
        },
        'code': '4S'
      }, {
        'value': '5',
        'image': 'https://deckofcardsapi.com/static/img/5S.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/5S.svg',
          'png': 'https://deckofcardsapi.com/static/img/5S.png'
        },
        'code': '5S'
      }, {
        'value': '6',
        'image': 'https://deckofcardsapi.com/static/img/6S.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/6S.svg',
          'png': 'https://deckofcardsapi.com/static/img/6S.png'
        },
        'code': '6S'
      }, {
        'value': '7',
        'image': 'https://deckofcardsapi.com/static/img/7S.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/7S.svg',
          'png': 'https://deckofcardsapi.com/static/img/7S.png'
        },
        'code': '7S'
      }, {
        'value': '8',
        'image': 'https://deckofcardsapi.com/static/img/8S.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/8S.svg',
          'png': 'https://deckofcardsapi.com/static/img/8S.png'
        },
        'code': '8S'
      }, {
        'value': '9',
        'image': 'https://deckofcardsapi.com/static/img/9S.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/9S.svg',
          'png': 'https://deckofcardsapi.com/static/img/9S.png'
        },
        'code': '9S'
      }, {
        'value': '10',
        'image': 'https://deckofcardsapi.com/static/img/0S.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/0S.svg',
          'png': 'https://deckofcardsapi.com/static/img/0S.png'
        },
        'code': '0S'
      }, {
        'value': 'JACK',
        'image': 'https://deckofcardsapi.com/static/img/JS.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/JS.svg',
          'png': 'https://deckofcardsapi.com/static/img/JS.png'
        },
        'code': 'JS'
      }, {
        'value': 'QUEEN',
        'image': 'https://deckofcardsapi.com/static/img/QS.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/QS.svg',
          'png': 'https://deckofcardsapi.com/static/img/QS.png'
        },
        'code': 'QS'
      }, {
        'value': 'KING',
        'image': 'https://deckofcardsapi.com/static/img/KS.png',
        'suit': 'SPADES',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/KS.svg',
          'png': 'https://deckofcardsapi.com/static/img/KS.png'
        },
        'code': 'KS'
      }, {
        'value': 'ACE',
        'image': 'https://deckofcardsapi.com/static/img/aceDiamonds.png',
        'suit': 'DIAMONDS',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/AD.svg',
          'png': 'https://deckofcardsapi.com/static/img/AD.png'
        },
        'code': 'AD'
      }, {
        'value': '2',
        'image': 'https://deckofcardsapi.com/static/img/2D.png',
        'suit': 'DIAMONDS',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/2D.svg',
          'png': 'https://deckofcardsapi.com/static/img/2D.png'
        },
        'code': '2D'
      }, {
        'value': '3',
        'image': 'https://deckofcardsapi.com/static/img/3D.png',
        'suit': 'DIAMONDS',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/3D.svg',
          'png': 'https://deckofcardsapi.com/static/img/3D.png'
        },
        'code': '3D'
      }, {
        'value': '4',
        'image': 'https://deckofcardsapi.com/static/img/4D.png',
        'suit': 'DIAMONDS',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/4D.svg',
          'png': 'https://deckofcardsapi.com/static/img/4D.png'
        },
        'code': '4D'
      }, {
        'value': '5',
        'image': 'https://deckofcardsapi.com/static/img/5D.png',
        'suit': 'DIAMONDS',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/5D.svg',
          'png': 'https://deckofcardsapi.com/static/img/5D.png'
        },
        'code': '5D'
      }, {
        'value': '6',
        'image': 'https://deckofcardsapi.com/static/img/6D.png',
        'suit': 'DIAMONDS',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/6D.svg',
          'png': 'https://deckofcardsapi.com/static/img/6D.png'
        },
        'code': '6D'
      }, {
        'value': '7',
        'image': 'https://deckofcardsapi.com/static/img/7D.png',
        'suit': 'DIAMONDS',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/7D.svg',
          'png': 'https://deckofcardsapi.com/static/img/7D.png'
        },
        'code': '7D'
      }, {
        'value': '8',
        'image': 'https://deckofcardsapi.com/static/img/8D.png',
        'suit': 'DIAMONDS',
        'images': {
          'svg': 'https://deckofcardsapi.com/static/img/8D.svg',
          'png': 'https://deckofcardsapi.com/static/img/8D.png'
        },
        'code': '8D'
      }]
    }

    mock.onGet('https://deckofcardsapi.com/api/deck/new/').reply(200, deckMock)
    mock.onGet(`https://deckofcardsapi.com/api/deck/${deckMock.deck_id}/draw/?count=21`).reply(200, cardsMock)

    const wrapper = shallowMount(App)
    await wrapper.vm.dealCards()
    const { cards } = wrapper.vm

    expect(cards).toEqual(cardsMock.cards)
  })

  it('arrange cards', () => {
    const pile1 = [
      1, 4, 7
    ]
    const pile2 = [
      2, 5, 8
    ]
    const pile3 = [
      3, 6, 9
    ]
    const wrapper = shallowMount(App)

    wrapper.vm.arrangeCards(pile1, pile2, pile3)

    expect(wrapper.vm.cards).toEqual([ 1, 4, 7, 2, 5, 8, 3, 6, 9 ])
  })

  it('reset piles', () => {
    const pile1 = [
      1, 4, 7
    ]
    const pile2 = [
      2, 5, 8
    ]
    const pile3 = [
      3, 6, 9
    ]
    const wrapper = shallowMount(App)
    wrapper.setData({
      pile1,
      pile2,
      pile3
    })

    wrapper.vm.resetPiles()

    expect(wrapper.vm.pile1).toEqual([])
    expect(wrapper.vm.pile2).toEqual([])
    expect(wrapper.vm.pile3).toEqual([])

  })
})
