import { useCallback, useState } from 'react'

import { Account, AccountPlatform } from '@/entities/account'
import { aiApiPayloadSchema, useRequestAiAssistanceMutation } from '@/entities/post'
import { type AiOutput } from '@/entities/post/model/ai-assistance-form-schema'
import { worldLanguages } from '@/shared/const/languages'

import { aiToneOptions } from '../const/ai-tone-options'
import { AiToneId } from '../model/ai.types'

export type LanguageNameEn = (typeof worldLanguages)[number]['name_en']

export interface AiIntroductary {
    tone: AiToneId
    language: LanguageNameEn
    includeHashtags: boolean
    notesForAi: string
    selectedAccounts: {
        platform: AccountPlatform
        id: string
    }[]
    forbiddenWords: string[]
}

export interface AiValidationErrors {
    formErrors: string[]
    fieldErrors: Record<string, string[]>
}

const defaultAiIntroductary: AiIntroductary = {
    tone: aiToneOptions[0]?.id ?? 'friendly',
    language: 'English',
    includeHashtags: false,
    notesForAi: '',
    selectedAccounts: [],
    forbiddenWords: [],
}

type AiSubmissionResult =
    | { status: 'validation_error'; error: unknown }
    | { status: 'error'; error: unknown }
    | { status: 'success'; result: AiOutput }

export const useAiForm = () => {
    const [aiIntroductary, setAiIntroductary] = useState<AiIntroductary>(defaultAiIntroductary)
    const [currentFrobiddenWord, setCurrentForbiddenWord] = useState<string>('')
    const [validationErrors, setValidationErrors] = useState<AiValidationErrors | null>(null)
    const [triggerAi, { isLoading }] = useRequestAiAssistanceMutation()

    const handleSubmit = useCallback(async (): Promise<AiSubmissionResult> => {
        const validationResult = aiApiPayloadSchema.safeParse(aiIntroductary)

        if (!validationResult.success) {
            const flatError = validationResult.error.flatten()
            setValidationErrors({
                formErrors: flatError.formErrors,
                fieldErrors: flatError.fieldErrors,
            })
            return { status: 'validation_error', error: validationResult.error }
        }

        setValidationErrors(null)

        try {
            const result = await triggerAi(validationResult.data).unwrap()
            return { status: 'success', result }
        } catch (error) {
            console.error('AI payload request failed:', error)
            return { status: 'error', error }
        }
    }, [aiIntroductary, triggerAi])

    const handleAccountSelect = useCallback((account: Account) => {
        setValidationErrors(null)
        setAiIntroductary((prevState) => {
            const isAlreadySelected = prevState.selectedAccounts.some((item) => item.id === account.id)

            const selectedAccounts = isAlreadySelected
                ? prevState.selectedAccounts.filter((item) => item.id !== account.id)
                : [...prevState.selectedAccounts, { id: account.id, platform: account.platform }]

            return {
                ...prevState,
                selectedAccounts,
            }
        })
    }, [])

    const setLanguage = useCallback((language: LanguageNameEn) => {
        setValidationErrors(null)
        setAiIntroductary((prevState) => ({
            ...prevState,
            language,
        }))
    }, [])

    const setTone = useCallback((tone: AiToneId) => {
        setValidationErrors(null)
        setAiIntroductary((prevState) => ({
            ...prevState,
            tone,
        }))
    }, [])

    const setNotesForAi = useCallback((notes: string) => {
        setValidationErrors(null)
        setAiIntroductary((prevState) => ({
            ...prevState,
            notesForAi: notes,
        }))
    }, [])

    const setIncludeHashtags = useCallback((includeHashtags: boolean) => {
        setValidationErrors(null)
        setAiIntroductary((prevState) => ({
            ...prevState,
            includeHashtags,
        }))
    }, [])

    const insertForbiddenWordsForAi = () => {
        if (!currentFrobiddenWord) return
        setValidationErrors(null)

        setAiIntroductary((prevState) => ({
            ...prevState,
            forbiddenWords: [...prevState.forbiddenWords, currentFrobiddenWord],
        }))

        setCurrentForbiddenWord('')
    }

    const removeForbiddenWord = useCallback((word: string) => {
        setValidationErrors(null)
        setAiIntroductary((prevState) => ({
            ...prevState,
            forbiddenWords: prevState.forbiddenWords.filter((value) => value !== word),
        }))
    }, [])

    return {
        aiIntroductary,
        setAiIntroductary,
        handleSubmit,
        currentFrobiddenWord,
        setCurrentForbiddenWord,
        insertForbiddenWordsForAi,
        toneOptions: aiToneOptions,
        handleAccountSelect,
        removeForbiddenWord,
        setLanguage,
        setTone,
        setNotesForAi,
        setIncludeHashtags,
        validationErrors,
        isLoading,
    }
}
