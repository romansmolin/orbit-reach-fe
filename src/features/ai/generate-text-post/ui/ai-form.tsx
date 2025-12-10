import React from 'react'

import { Plus, X } from 'lucide-react'

import { Account } from '@/entities/account'
import { SelectAccounts } from '@/features/account/select-accounts'
import { GenericSelect } from '@/shared/components/generic-select/ui/generic-select'
import { worldLanguages } from '@/shared/const/languages'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Switch } from '@/shared/ui/switch'
import { Textarea } from '@/shared/ui/textarea'

import { AiToneOption } from '../const/ai-tone-options'
import { AiIntroductary, AiValidationErrors, LanguageNameEn } from '../hooks/use-ai-form'
import { AiToneId } from '../model/ai.types'

interface AiFormProps {
    aiIntroductatry: AiIntroductary
    toneOptions: AiToneOption[]
    accounts: Account[]
    isDisabled: boolean
    currentForbiddenWord: string
    onLanguageChange: (language: LanguageNameEn) => void
    onToneChange: (tone: AiToneId) => void
    onNotesChange: (notes: string) => void
    onHashtagsChange: (value: boolean) => void
    onAccountSelect: (account: Account) => void
    onCurrentForbiddenWordChange: (value: string) => void
    onInsertForbiddenWord: () => void
    onRemoveForbiddenWord: (word: string) => void
    isAccountsLoading?: boolean
    errors?: AiValidationErrors | null
}

const renderFieldErrors = (
    field: keyof AiIntroductary | string,
    errors: AiValidationErrors | null | undefined
) => {
    const messages = errors?.fieldErrors?.[field]
    if (!messages || messages.length === 0) return null

    return (
        <ul className="space-y-1 text-xs text-destructive">
            {messages.map((message, index) => (
                <li key={`${field}-${index}`}>{message}</li>
            ))}
        </ul>
    )
}

export const AiForm = ({
    aiIntroductatry,
    toneOptions,
    accounts,
    isDisabled,
    currentForbiddenWord,
    onLanguageChange,
    onToneChange,
    onNotesChange,
    onHashtagsChange,
    onAccountSelect,
    onCurrentForbiddenWordChange,
    onInsertForbiddenWord,
    onRemoveForbiddenWord,
    isAccountsLoading = false,
    errors,
}: AiFormProps) => {
    return (
        <div className="flex flex-col gap-7">
            {errors?.formErrors?.length ? (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                    {errors.formErrors.map((message, index) => (
                        <p key={`form-error-${index}`}>{message}</p>
                    ))}
                </div>
            ) : null}

            <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="language">Language</Label>

                <GenericSelect
                    getOptionLabel={(language) => language.name_en}
                    getOptionValue={(language) => language.name_en}
                    handleSelect={(value) => onLanguageChange(value as LanguageNameEn)}
                    options={worldLanguages}
                    placeholder="Select language"
                    selectLabel="Languages"
                    selectTriggerClass="w-full"
                    selectValue={aiIntroductatry.language}
                />

                {renderFieldErrors('language', errors)}
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="tone">Tone</Label>

                <GenericSelect
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.id}
                    handleSelect={(value) => onToneChange(value as AiToneId)}
                    options={toneOptions}
                    placeholder="Select tone"
                    selectLabel="Tone"
                    selectTriggerClass="w-full"
                    selectValue={aiIntroductatry.tone}
                />

                {renderFieldErrors('tone', errors)}
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="forbidden-words"> Forbidden words</Label>
                <div className="flex gap-2">
                    <Input
                        className="h-10"
                        id="forbidden-words"
                        placeholder="Add forbidden words"
                        value={currentForbiddenWord}
                        onChange={(event) => onCurrentForbiddenWordChange(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault()
                                onInsertForbiddenWord()
                            }
                        }}
                    />
                    <Button
                        disabled={!currentForbiddenWord}
                        size="icon"
                        variant={'outline'}
                        onClick={onInsertForbiddenWord}
                    >
                        <Plus />
                    </Button>
                </div>

                {renderFieldErrors('forbiddenWords', errors)}
            </div>

            {aiIntroductatry.forbiddenWords.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                    {aiIntroductatry.forbiddenWords.map((word) => (
                        <Badge
                            key={word}
                            className="h-7 items-center gap-2 justify-between pl-2 pr-2"
                            variant="outline"
                        >
                            {word}
                            <button
                                aria-label={`Remove ${word}`}
                                className="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                                type="button"
                                onClick={() => onRemoveForbiddenWord(word)}
                            >
                                <X className="size-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <Label htmlFor="notesForAi">Notes for AI</Label>
                <Textarea
                    id="notesForAi"
                    maxLength={500}
                    placeholder="Add notes that should be considered"
                    value={aiIntroductatry.notesForAi}
                    onChange={(event) => onNotesChange(event.target.value)}
                />

                {renderFieldErrors('notesForAi', errors)}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="include-hashtags"> Include hashtags?</Label>
                    <Switch
                        checked={aiIntroductatry.includeHashtags}
                        id="include-hashtags"
                        onCheckedChange={onHashtagsChange}
                    />
                </div>

                {renderFieldErrors('includeHashtags', errors)}
            </div>

            <div className="flex flex-col gap-2">
                <SelectAccounts
                    isDisabled={isDisabled}
                    isLoading={isAccountsLoading}
                    selectedAccounts={aiIntroductatry.selectedAccounts}
                    socialMediaAccounts={accounts}
                    onAccountSelect={onAccountSelect}
                />

                {renderFieldErrors('selectedAccounts', errors)}
            </div>
        </div>
    )
}
