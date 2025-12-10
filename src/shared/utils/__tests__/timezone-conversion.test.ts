import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { convertLocalTimeToUtcISOString } from '../timezone'

describe('convertLocalTimeToUtcISOString', () => {
    it('converts a DST-aware timezone to the correct UTC instant', () => {
        const date = new Date(2025, 5, 1) // 1 June 2025

        const result = convertLocalTimeToUtcISOString({
            date,
            time: '12:07',
            timezone: 'Europe/Riga',
        })

        assert.equal(result, '2025-06-01T09:07:00.000Z')
    })

    it('converts a non-DST timezone to the correct UTC instant', () => {
        const date = new Date(2025, 10, 5) // 5 November 2025

        const result = convertLocalTimeToUtcISOString({
            date,
            time: '12:07',
            timezone: 'Asia/Kuala_Lumpur',
        })

        assert.equal(result, '2025-11-05T04:07:00.000Z')
    })

    it('falls back to local interpretation when timezone is not provided', () => {
        const date = new Date(2025, 10, 5)
        const expected = new Date(2025, 10, 5, 12, 7).toISOString()

        const result = convertLocalTimeToUtcISOString({
            date,
            time: '12:07',
        })

        assert.equal(result, expected)
    })
})
