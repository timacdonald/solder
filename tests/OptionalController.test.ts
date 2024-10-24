import { expect, test, describe } from 'vitest'
import {optional, manyOptional } from '../workbench/resources/js/actions/App/Http/Controllers/OptionalController'

describe('optional', async () => {
    test('properties', () => {
      expect(Object.keys(optional)).toEqual(['url', 'post', 'definition'])
    })

    test('url', () => {
        expect(optional.url()).toBe('/optional')
        expect(optional.url({ parameter: 'xxxx' })).toBe('/optional/xxxx')
    })

    test('post', () => {
        expect(optional.post()).toEqual({
            action: '/optional',
            method: 'post',
            _method: 'post'
        })

        expect(optional.post({ parameter: 'xxxx' })).toEqual({
            action: '/optional/xxxx',
            method: 'post',
            _method: 'post'
        })
    })

    test('definition', () => {
      expect(Object.keys(optional.definition)).toEqual(['methods', 'uri'])
      expect(optional.definition.methods).toEqual(['post'])
      expect(optional.definition.uri).toBe('/optional/{parameter?}')
    })
})

describe('manyOptional', async () => {
    test('properties', () => {
      expect(Object.keys(manyOptional)).toEqual(['url', 'post', 'definition'])
    })

    test('url', () => {
        expect(manyOptional.url()).toBe('/many-optional')
        expect(manyOptional.url({ one: '1' })).toBe('/many-optional/1')
        expect(manyOptional.url({ one: '1', two: '2' })).toBe('/many-optional/1/2')
        expect(manyOptional.url({ one: '1', two: '2', three: '3' })).toBe('/many-optional/1/2/3')
        // TODO: can this throw an exception or be typed away?
        expect(manyOptional.url({ three: '3' })).toBe('/many-optional///3')
    })

    // test('post', () => {
    //     expect(manyOptional.post()).toEqual({
    //         action: '/optional',
    //         method: 'post',
    //         _method: 'post'
    //     })

    //     expect(manyOptional.post({ parameter: 'xxxx' })).toEqual({
    //         action: '/optional/xxxx',
    //         method: 'post',
    //         _method: 'post'
    //     })
    // })

    // test('definition', () => {
    //   expect(Object.keys(manyOptional.definition)).toEqual(['methods', 'uri'])
    //   expect(manyOptional.definition.methods).toEqual(['post'])
    //   expect(manyOptional.definition.uri).toBe('/optional/{parameter?}')
    // })
})
