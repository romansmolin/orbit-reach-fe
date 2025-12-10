'use client'

import { useCallback, useEffect, useState } from 'react'

import { Account } from '@/entities/account'
import { AiOutput } from '@/entities/post/model/ai-assistance-form-schema'
import { useGetUserInfoQuery } from '@/entities/user'
import { usePostContext } from '@/features/post/create-post/context/use-post-context'

import { useAiAutocomplete } from './use-ai-autocomplete'
import { useAiForm } from './use-ai-form'

interface UseAiButtonParams {
    accounts: Account[]
    isDisabled: boolean
    isAccountsLoading?: boolean
    onSubmit?: () => void
}

export const useAiButton = ({ accounts, isDisabled, isAccountsLoading = false, onSubmit }: UseAiButtonParams) => {
    const { data: userInfo, isLoading, isFetching } = useGetUserInfoQuery()
    const normalizedPlanName = userInfo?.plan?.planName?.trim().toUpperCase()
    const isProUser = normalizedPlanName === 'PRO'
    const isUserInfoLoading = isLoading || isFetching

    const { onPostTextChange, setMainCaption, clearAccountTags, addTagToAccount } = usePostContext()

    const {
        aiIntroductary,
        setAiIntroductary,
        currentFrobiddenWord,
        setCurrentForbiddenWord,
        insertForbiddenWordsForAi,
        toneOptions,
        handleAccountSelect,
        removeForbiddenWord,
        handleSubmit,
        setLanguage,
        setTone,
        setNotesForAi,
        setIncludeHashtags,
        validationErrors,
        isLoading: isAiLoading,
    } = useAiForm()

    const { applyAiOutputToContext } = useAiAutocomplete({
        aiIntroductary,
        addTagToAccount,
        clearAccountTags,
        onPostTextChange,
        setMainCaption,
    })

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        if (!isDialogOpen) return

        setAiIntroductary((prev) => {
            const mappedAccounts = accounts.map((account) => ({
                id: account.id,
                platform: account.platform,
            }))

            const hasSameAccounts =
                prev.selectedAccounts.length === mappedAccounts.length &&
                prev.selectedAccounts.every((accountRef, index) => accountRef.id === mappedAccounts[index]?.id)

            if (hasSameAccounts) {
                return prev
            }

            return {
                ...prev,
                selectedAccounts: mappedAccounts,
            }
        })
    }, [accounts, isDialogOpen, setAiIntroductary])

    const applyResult = useCallback(
        (result: AiOutput) => {
            applyAiOutputToContext(result)
            setIsDialogOpen(false)
            onSubmit?.()
        },
        [applyAiOutputToContext, onSubmit]
    )

    const handleFormSubmit = useCallback(async () => {
        const submission = await handleSubmit()

        if (submission.status !== 'success') {
            return
        }

        applyResult(submission.result)
    }, [applyResult, handleSubmit])

    return {
        uiGuardPassed: !isUserInfoLoading && isProUser,
        isDialogOpen,
        setIsDialogOpen,
        formState: {
            aiIntroductary,
            currentFrobiddenWord,
            validationErrors,
            toneOptions,
            isAccountsLoading,
            isSubmitting: isAiLoading,
        },
        formHandlers: {
            handleAccountSelect,
            setCurrentForbiddenWord,
            setIncludeHashtags,
            insertForbiddenWordsForAi,
            setLanguage,
            setNotesForAi,
            removeForbiddenWord,
            setTone,
        },
        handleFormSubmit,
        isActionDisabled: isDisabled || isAiLoading,
        triggerDisabled: isDisabled,
    }
}
