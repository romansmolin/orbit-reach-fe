'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { MediaType } from '@/entities/post'
import { autoFixAspect, maxRatio, minRatio, tolerance } from '@/shared/utils/aspect-ratio-service'

interface UseMediaManagementProps {
    initialMedia?: File[] | undefined
    initialMediaType?: MediaType
    initialPreviewUrls?: string[]
}

export const useMediaManagement = ({
    initialMedia = undefined,
    initialMediaType = MediaType.IMAGE,
    initialPreviewUrls = [],
}: UseMediaManagementProps = {}) => {
    const [media, setMedia] = useState<File[] | undefined>(initialMedia)
    const [mediaType, setMediaType] = useState<MediaType>(initialMediaType)
    const [previewUrls, setPreviewUrls] = useState<string[]>(initialPreviewUrls)

    // Clean up preview URLs on unmount
    useEffect(() => {
        return () => {
            previewUrls.forEach((url) => {
                if (url && url.startsWith('blob:')) {
                    URL.revokeObjectURL(url)
                }
            })
        }
    }, [previewUrls])

    const onFileSelect = useCallback(
        async (files: File[]) => {
            if (!files || files.length === 0) return

            previewUrls.forEach((url) => URL.revokeObjectURL(url))
            setPreviewUrls([])

            const videoFiles = files.filter((file) => file.type.startsWith('video'))
            const imageFiles = files.filter((file) => file.type.startsWith('image'))

            if (videoFiles.length > 1) {
                toast.error('Only one video can be uploaded per post.')
                return
            }

            if (videoFiles.length === 1 && imageFiles.length > 0) {
                toast.error('Cannot mix videos and images in the same post.')
                return
            }

            if (videoFiles.length === 1) {
                const videoFile = videoFiles[0]
                const url = URL.createObjectURL(videoFile)
                setPreviewUrls([url])
                setMedia([videoFile])
                setMediaType(MediaType.VIDEO)
                toast.success('Video uploaded successfully!')
            } else if (imageFiles.length > 0) {
                const processedFiles: File[] = []
                const processedUrls: string[] = []

                for (const file of imageFiles) {
                    try {
                        const url = URL.createObjectURL(file)
                        const img = new Image()

                        await new Promise<void>((resolve, reject) => {
                            img.onload = async () => {
                                const ratio = img.width / img.height
                                URL.revokeObjectURL(url)

                                if (ratio + tolerance >= minRatio && ratio - tolerance <= maxRatio) {
                                    // within bounds, just use it
                                    const previewUrl = URL.createObjectURL(file)
                                    processedFiles.push(file)
                                    processedUrls.push(previewUrl)
                                    resolve()
                                } else {
                                    try {
                                        const targetRatio =
                                            ratio > maxRatio
                                                ? maxRatio
                                                : ratio < minRatio
                                                  ? minRatio
                                                  : ratio
                                        const { file: fixed, previewUrl } = await autoFixAspect(
                                            file,
                                            targetRatio
                                        )

                                        processedFiles.push(fixed)
                                        processedUrls.push(previewUrl)
                                        resolve()
                                    } catch (err) {
                                        console.error(err)
                                        toast.error(`Failed to auto-fix aspect ratio for ${file.name}.`)
                                        reject(err)
                                    }
                                }
                            }

                            img.onerror = () => {
                                URL.revokeObjectURL(url)
                                toast.error(`Could not load image: ${file.name}`)
                                reject(new Error('Failed to load image'))
                            }

                            img.src = url
                        })
                    } catch (err) {
                        console.error(`Error processing ${file.name}:`, err)
                    }
                }

                if (processedFiles.length > 0) {
                    setPreviewUrls(processedUrls)
                    setMedia(processedFiles)
                    setMediaType(MediaType.IMAGE)

                    if (processedFiles.length !== imageFiles.length) {
                        toast.warning(
                            `Successfully processed ${processedFiles.length} out of ${imageFiles.length} images.`
                        )
                    } else {
                        toast.success(`Successfully uploaded ${processedFiles.length} image(s)!`)
                    }
                }
            } else {
                toast.error('No valid files selected. Please choose images or a video.')
            }
        },
        [previewUrls]
    )

    const resetMedia = useCallback(() => {
        previewUrls.forEach((url) => URL.revokeObjectURL(url))
        setMedia(undefined)
        setMediaType(MediaType.IMAGE)
        setPreviewUrls([])
    }, [previewUrls])

    return {
        media,
        mediaType,
        previewUrls,

        setMedia,
        setMediaType,
        setPreviewUrls,
        onFileSelect,
        resetMedia,
    }
}
