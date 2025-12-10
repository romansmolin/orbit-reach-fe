'use client'

import { useCallback } from 'react'

import { toast } from 'sonner'

import { AiOutput } from '@/entities/post/model/ai-assistance-form-schema'
import { AccountPlatform } from '@/entities/account'

interface UseAiAutocompleteParams {
    aiIntroductary: {
        selectedAccounts: { id: string; platform: AccountPlatform }[]
        includeHashtags: boolean
    }
    addTagToAccount?: (accountId: string, tag: string) => void
    clearAccountTags?: (accountId: string) => void
    onPostTextChange: (
        text: string,
        accountId: string,
        platform?: AccountPlatform,
        title?: string
    ) => void
    setMainCaption: (value: string) => void
}

export const useAiAutocomplete = ({
    aiIntroductary,
    addTagToAccount,
    clearAccountTags,
    onPostTextChange,
    setMainCaption,
}: UseAiAutocompleteParams) => {
    const applyAiOutputToContext = useCallback(
        (result: AiOutput) => {
            const items = result.items
            if (!items.length) {
                toast.error('AI response is empty. Please try again.')
                return
            }

            if (aiIntroductary.selectedAccounts.length !== items.length) {
                toast.warning('Received unexpected number of AI suggestions. Some accounts may be skipped.')
            }

            aiIntroductary.selectedAccounts.forEach((selectedAccount, index) => {
                const item = items[index]
                if (!item) {
                    return
                }

                if (aiIntroductary.includeHashtags && typeof addTagToAccount === 'function') {
                    const generatedTags = Array.isArray(item.hashtags)
                        ? item.hashtags
                              .map((rawTag) => rawTag?.trim())
                              .filter(Boolean)
                              .map((tag) => tag!.replace(/^#/, ''))
                              .filter(Boolean)
                        : []

                    if (generatedTags.length > 0) {
                        clearAccountTags?.(selectedAccount.id)
                        generatedTags.forEach((tag) => addTagToAccount(selectedAccount.id, tag as string))
                    }
                }

                onPostTextChange(item.text, selectedAccount.id, selectedAccount.platform, item.title ?? undefined)
            })

            const [firstItem] = items
            if (firstItem?.text) {
                setMainCaption(firstItem.text)
            }

            const warnings = items.flatMap((item) => item.warnings ?? [])
            if (warnings.length) {
                toast.warning(warnings.join('\n'))
            }
        },
        [aiIntroductary.includeHashtags, aiIntroductary.selectedAccounts, addTagToAccount, clearAccountTags, onPostTextChange, setMainCaption]
    )

    return {
        applyAiOutputToContext,
    }
}
