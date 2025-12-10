'use client'

import React from 'react'

import { Bot, Loader2 } from 'lucide-react'

import { Account } from '@/entities/account'
import { GenericDialog } from '@/shared/components'
import { Button } from '@/shared/ui/button'

import { useAiButton } from '../hooks/use-ai-button'

import { AiForm } from './ai-form'

interface AiButtonProps {
    isDisabled: boolean
    accounts: Account[]
    onSubmit?: () => void
    isAccountsLoading?: boolean
}

export const AiButton = ({ isDisabled, accounts, onSubmit, isAccountsLoading = false }: AiButtonProps) => {
    const {
        uiGuardPassed,
        isDialogOpen,
        setIsDialogOpen,
        formState,
        formHandlers,
        handleFormSubmit,
        isActionDisabled,
        triggerDisabled,
    } = useAiButton({
        accounts,
        isAccountsLoading,
        isDisabled,
        onSubmit,
    })

    const dialogContent = (
        <div className="flex flex-col gap-5 w-full">
            <AiForm
                accounts={accounts}
                aiIntroductatry={formState.aiIntroductary}
                currentForbiddenWord={formState.currentFrobiddenWord}
                errors={formState.validationErrors}
                isAccountsLoading={formState.isAccountsLoading}
                isDisabled={isActionDisabled}
                toneOptions={formState.toneOptions}
                onAccountSelect={formHandlers.handleAccountSelect}
                onCurrentForbiddenWordChange={formHandlers.setCurrentForbiddenWord}
                onHashtagsChange={formHandlers.setIncludeHashtags}
                onInsertForbiddenWord={formHandlers.insertForbiddenWordsForAi}
                onLanguageChange={formHandlers.setLanguage}
                onNotesChange={formHandlers.setNotesForAi}
                onRemoveForbiddenWord={formHandlers.removeForbiddenWord}
                onToneChange={formHandlers.setTone}
            />
        </div>
    )

    if (!uiGuardPassed) {
        return null
    }

    return (
        <GenericDialog
            className="!max-w-3xl max-h-[90vh] overflow-y-auto"
            dialogContent={dialogContent}
            dialogHeaderDescription="Let our AI do the work — it creates content inspired by industry best practices."
            dialogHeaderTitle="Have no idea?"
            dialogOpen={isDialogOpen}
            dialogFooter={
                <Button
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500"
                    disabled={isActionDisabled}
                    size="lg"
                    onClick={handleFormSubmit}
                >
                    {formState.isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Bot className="h-4 w-4" />
                    )}
                    {formState.isSubmitting ? 'Generating…' : 'Generate Content'}
                </Button>
            }
            dialogTriggerComp={
                <Button
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500"
                    disabled={triggerDisabled}
                    size="lg"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <Bot className="h-4 w-4" />
                    Use AI
                </Button>
            }
            onDialogOpenChange={setIsDialogOpen}
        />
    )
}
