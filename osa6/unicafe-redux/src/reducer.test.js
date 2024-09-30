import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset is clicked', () => {
    const action = {
      type: 'ZERO'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  test('all types are incemented', () => {

    const state = initialState

    deepFreeze(state)
    const StateAddGood = counterReducer(state, {type: 'GOOD'})
    deepFreeze(StateAddGood)
    const StateAddOK = counterReducer(StateAddGood, {type: 'OK'})
    deepFreeze(StateAddOK)
    const StateAddBad = counterReducer(StateAddOK, {type: 'BAD'})
    expect(StateAddBad).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })
  })

  test('all types are incremented and reset', () => {

    const state = initialState

    deepFreeze(state)
    const StateAddGood = counterReducer(state, {type: 'GOOD'})
    deepFreeze(StateAddGood)
    const StateAddOK = counterReducer(StateAddGood, {type: 'OK'})
    deepFreeze(StateAddOK)
    const StateAddBad = counterReducer(StateAddOK, {type: 'BAD'})
    deepFreeze(StateAddBad)
    const StateZero = counterReducer(StateAddBad, {type: 'ZERO'})
    expect(StateZero).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  test('all types are incremented, reset, and ok', () => {

    const state = initialState

    deepFreeze(state)
    const StateAddGood = counterReducer(state, {type: 'GOOD'})
    deepFreeze(StateAddGood)
    const StateAddOK = counterReducer(StateAddGood, {type: 'OK'})
    deepFreeze(StateAddOK)
    const StateAddBad = counterReducer(StateAddOK, {type: 'BAD'})
    deepFreeze(StateAddBad)
    const StateZero = counterReducer(StateAddBad, {type: 'ZERO'})
    deepFreeze(StateZero)
    const StateAddOK2 = counterReducer(StateZero, {type: 'OK'})
    deepFreeze(StateAddOK2)
    expect(StateAddOK2).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })
})