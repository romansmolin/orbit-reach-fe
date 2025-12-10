'use client'

import React from 'react'

import { ChevronDownIcon, CircleXIcon, Search } from 'lucide-react'
import Link from 'next/link'

import { AccountPlatform } from '@/entities/account'
import { PostStatus } from '@/entities/post'
import { GenericCard } from '@/shared/components/generic-card'
import { GenericSelect } from '@/shared/components/generic-select/ui/generic-select'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Separator } from '@/shared/ui/separator'

import usePostFilters from '../model/use-post-filters'

const accountPlatforms: AccountPlatform[] = Object.values(AccountPlatform)
const postStatus: PostStatus[] = Object.values(PostStatus)

const PostFilters = () => {
    const {
        filters,
        openFrom,
        openTo,
        handleClear,
        handleFromDateChange,
        handlePlatformChange,
        handleStatusChange,
        handleToDateChange,
        setOpenFrom,
        setOpenTo,
        buildFilterUrl,
    } = usePostFilters()

    const cardContent = (
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-2 items-center">
                <GenericSelect
                    handleSelect={(value) => handlePlatformChange(value as AccountPlatform)}
                    options={accountPlatforms}
                    placeholder="Select a platform"
                    selectTriggerClass="w-full text-muted-foreground"
                    selectValue={filters.platform ?? ''}
                />

                <GenericSelect
                    handleSelect={(value) => handleStatusChange(value as PostStatus)}
                    options={postStatus}
                    placeholder="Select a status"
                    selectTriggerClass="w-full text-muted-foreground"
                    selectValue={filters.status ?? ''}
                />

                <div className="flex flex-col gap-3">
                    <Popover open={openFrom} onOpenChange={setOpenFrom}>
                        <PopoverTrigger asChild>
                            <Button
                                className="w-full h-10 font-normal !text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 hover:bg-transparent dark:hover:bg-input/30 flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                                id="date"
                            >
                                {filters.fromDate
                                    ? new Date(filters.fromDate).toLocaleDateString()
                                    : 'Select from date'}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto overflow-hidden p-0">
                            <Calendar
                                captionLayout="dropdown"
                                mode="single"
                                selected={filters.fromDate ? new Date(filters.fromDate) : undefined}
                                onSelect={handleFromDateChange}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex flex-col gap-3">
                    <Popover open={openTo} onOpenChange={setOpenTo}>
                        <PopoverTrigger asChild>
                            <Button
                                className="w-full h-10 font-normal !text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 hover:bg-transparent dark:hover:bg-input/30 flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                                id="date"
                            >
                                {filters.toDate ? new Date(filters.toDate).toLocaleDateString() : 'Select to date'}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto overflow-hidden p-0">
                            <Calendar
                                captionLayout="dropdown"
                                mode="single"
                                selected={filters.toDate ? new Date(filters.toDate) : undefined}
                                onSelect={handleToDateChange}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <Separator className="hidden md:block md:h-20! lg:h-10! my-auto " orientation="vertical" />

            <div className="flex w-full md:flex-col h-full lg:flex-row gap-4 md:!w-fit">
                <Button asChild className="lg:flex-1" size={'lg'} variant={'outline'} onClick={handleClear}>
                    <Link href={'/all-posts'}>
                        <CircleXIcon />
                        Clear
                    </Link>
                </Button>
                <Button asChild className="lg:flex-1" size={'lg'}>
                    <Link href={buildFilterUrl()}>
                        <Search />
                        Filter
                    </Link>
                </Button>
            </div>
        </div>
    )

    return <GenericCard cardContainerClassName="gap-4" cardContent={cardContent} />
}

export default PostFilters
