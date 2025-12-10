import React from 'react'

import { AccountPlatform } from '@/entities/account'
import { CUSTOM_MEDIA_LIMITS, platformLimits } from '@/entities/account/const/platform-limits'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'

const platformNames: Record<AccountPlatform, string> = {
    [AccountPlatform.instagram]: 'Instagram',
    [AccountPlatform.facebook]: 'Facebook',
    [AccountPlatform.threads]: 'Threads',
    [AccountPlatform.tiktok]: 'TikTok',
    [AccountPlatform.youtube]: 'YouTube',
    [AccountPlatform.bluesky]: 'Bluesky',
    [AccountPlatform.pinterest]: 'Pinterest',
    [AccountPlatform.linkedin]: 'LinkedIn',
    [AccountPlatform.x]: 'X',
}

const formatDuration = (seconds: number) => {
    if (seconds >= 3600) {
        const hours = seconds / 3600
        return `${hours} hour${hours === 1 ? '' : 's'}`
    }
    if (seconds >= 60) {
        const minutes = seconds / 60
        return `${minutes} minute${minutes === 1 ? '' : 's'}`
    }
    return `${seconds} seconds`
}

interface PlatformLimitAlertProps {
    platform: AccountPlatform
}

export const PlatformLimitAlert = ({ platform }: PlatformLimitAlertProps) => {
    const limits = platformLimits[platform]
    if (!limits) return null

    const platformLabel = platformNames[platform]
    const bullets: string[] = []

    if (limits.captionLimit) {
        bullets.push(`Caption limit: ${limits.captionLimit.toLocaleString()} characters.`)
    }
    if (limits.textLimit) {
        bullets.push(`Text limit: ${limits.textLimit.toLocaleString()} characters.`)
    }
    if (limits.hashtagLimit !== undefined) {
        bullets.push(`Hashtags per post: ${limits.hashtagLimit}.`)
    }
    if (limits.mentionLimit !== undefined) {
        bullets.push(`Mentions per post: ${limits.mentionLimit}.`)
    }
    if (limits.titleLimit) {
        bullets.push(`Title limit: ${limits.titleLimit.toLocaleString()} characters.`)
    }
    if (limits.descriptionLimit) {
        bullets.push(`Description limit: ${limits.descriptionLimit.toLocaleString()} characters.`)
    }
    if (limits.mediaLimit) {
        bullets.push(`Media items per post: ${limits.mediaLimit}.`)
    }
    if (limits.maxImages) {
        bullets.push(
            `${platformLabel} allows up to ${limits.maxImages} images; OrbitReach currently supports ${CUSTOM_MEDIA_LIMITS.maxImages}.`
        )
    }
    if (limits.videoDurationSec) {
        bullets.push(`Video duration limit: ${formatDuration(limits.videoDurationSec)}.`)
    }
    if (limits.videoSizeMb) {
        bullets.push(
            `Video size limit: ${(limits.videoSizeMb / 1024).toFixed(1)} GB max; OrbitReach currently supports files up to ${CUSTOM_MEDIA_LIMITS.maxFileSizeMb} MB.`
        )
    }

    if (!bullets.length) return null

    return (
        <Alert variant="warning">
            <AlertTitle>Heads up for {platformLabel}</AlertTitle>
            <AlertDescription>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    {bullets.map((message) => (
                        <li key={message}>{message}</li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    )
}
