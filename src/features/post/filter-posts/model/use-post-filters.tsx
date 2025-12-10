'use client'

import { useState } from 'react'

import { AccountPlatform } from '@/entities/account'
import { IPostFilters, PostStatus } from '@/entities/post'

const usePostFilters = () => {
    const [openFrom, setOpenFrom] = useState(false)
    const [openTo, setOpenTo] = useState(false)
    const [filters, setFilters] = useState<IPostFilters>({})

    const buildFilterUrl = () => {
        const params = new URLSearchParams()

        if (filters.platform) {
            params.append('platform', filters.platform)
        }
        if (filters.status) {
            params.append('status', filters.status)
        }
        if (filters.fromDate) {
            params.append('fromDate', filters.fromDate)
        }
        if (filters.toDate) {
            params.append('toDate', filters.toDate)
        }

        const queryString = params.toString()
        return `/all-posts${queryString ? `?${queryString}` : ''}`
    }

    const handlePlatformChange = (value: AccountPlatform) => {
        setFilters((prev) => ({ ...prev, platform: value }))
    }

    const handleStatusChange = (value: PostStatus) => {
        setFilters((prev) => ({ ...prev, status: value }))
    }

    const handleFromDateChange = (date: Date | undefined) => {
        setFilters((prev) => ({
            ...prev,
            fromDate: date?.toISOString(),
        }))
        setOpenFrom(false)
    }

    const handleToDateChange = (date: Date | undefined) => {
        setFilters((prev) => ({
            ...prev,
            toDate: date?.toISOString(),
        }))
        setOpenTo(false)
    }

    const handleClear = () => {
        setFilters({})
    }
    return {
        openFrom,
        openTo,
        filters,
        setOpenFrom,
        setOpenTo,
        handleToDateChange,
        handleFromDateChange,
        handleStatusChange,
        handlePlatformChange,
        buildFilterUrl,
        handleClear,
    }
}

export default usePostFilters
