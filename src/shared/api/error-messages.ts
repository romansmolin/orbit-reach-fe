import { ErrorCode } from './error-codes'

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
    // General
    UNKNOWN_ERROR: 'An unknown error occurred. Please try again later.',
    BAD_REQUEST: 'Invalid request. Please check your input and try again.',
    UNAUTHORIZED: 'You are not authorized. Please sign in.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    CONFLICT: 'A conflict occurred with the requested operation.',

    // Auth
    INVALID_CREDENTIALS: 'Invalid username or password.',
    TOKEN_EXPIRED: 'Your session has expired. Please sign in again.',
    USER_ALREADY_EXISTS: 'A user with this email already exists.',

    // Content / Scheduling
    SCHEDULE_CONFLICT: 'This time slot is already scheduled for another post.',
    CONTENT_VALIDATION_FAILED: 'The content does not meet the requirements.',
    PLATFORM_UNAUTHORIZED: 'Account not connected to this platform.',

    // Files / Media
    FILE_TOO_LARGE: 'The file size exceeds the maximum limit.',
    UNSUPPORTED_FILE_TYPE: 'This file type is not supported.',
    FILE_UPLOAD_FAILED: 'Failed to upload file. Please try again.',

    // Rate limiting / Quotas
    RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Please try again later.',
    PLAN_LIMIT_REACHED: "You have reached your plan's limit.",
    DUPLICATES: 'Some accounts are already connected.',

    // Platform Daily Limits
    TIKTOK_DAILY_LIMIT: 'TikTok daily limit exceeded',
    YOUTUBE_DAILY_LIMIT: 'YouTube daily limit exceeded',
    PINTEREST_DAILY_LIMIT: 'Pinterest daily limit exceeded',
    INSTAGRAM_DAILY_LIMIT: 'Instagram daily limit exceeded',
    THREADS_DAILY_LIMIT: 'Threads daily limit exceeded',
    FACEBOOK_DAILY_LIMIT: 'Facebook daily limit exceeded',
    BLUESKY_DAILY_LIMIT: 'Bluesky daily limit exceeded',
    LINKEDIN_DAILY_LIMIT: 'LinkedIn daily limit exceeded',
    GOOGLE_DAILY_LIMIT: 'Google daily limit exceeded',
    X_DAILY_LIMIT: 'X (Twitter) daily limit exceeded',
}
