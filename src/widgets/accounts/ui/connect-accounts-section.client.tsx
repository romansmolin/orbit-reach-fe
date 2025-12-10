'use client'

import React from 'react'

import {
    BlueskyAddButton,
    FacebookAddButton,
    InstagramAddButton,
    LinkedinAddButton,
    PinterestAddButton,
    ThreadsAddButton,
} from '@/features/account/add-account'

const ConnectAccountsSectionClient = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FacebookAddButton />
            <InstagramAddButton />
            <ThreadsAddButton />
            <BlueskyAddButton />
            <LinkedinAddButton />
            <PinterestAddButton />
            {/* <TiktokAddButton /> */}
        </div>
    )
}

export default ConnectAccountsSectionClient
