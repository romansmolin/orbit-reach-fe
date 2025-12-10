import { useRef, useState } from 'react'

interface CoverData {
    timestamp?: number
    image?: File
    imagePreviewUrl?: string
}

const useSelectVideoCover = (
    onCoverDataSelect?: (cover: CoverData) => void,
    onCoverDataSelectComplete?: () => void
) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [coverImage, setCoverImage] = useState<string>()
    const [duration, setDuration] = useState<number>(0)
    const [currentTime, setCurrentTime] = useState<number>(0)

    const [tempCover, setTempCover] = useState<CoverData>({})

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }

    const handleScrub = (val: number[]) => {
        const time = val[0]
        setCurrentTime(time)
        if (videoRef.current) {
            videoRef.current.currentTime = time
        }
    }

    const handleSetCover = () => {
        const video = videoRef.current
        const canvas = canvasRef.current

        if (video && canvas) {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                const image = canvas.toDataURL('image/png')
                setCoverImage(image)
            }
        }
    }

    const handleConfirmCover = () => {
        if (tempCover.timestamp || tempCover.image) {
            onCoverDataSelect?.(tempCover)
            onCoverDataSelectComplete?.()
        }
    }

    const handleTimestampChange = (value: number[]) => {
        const timestamp = value[0]
        setTempCover((prev) => ({ ...prev, timestamp }))
        handleScrub(value)
    }

    const handleImageSelect = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0]
            const url = URL.createObjectURL(file)
            setTempCover((prev) => ({
                ...prev,
                image: file,
                imagePreviewUrl: url,
            }))
        }
    }

    const handleClearImage = () => {
        setTempCover((prev) => ({
            ...prev,
            image: undefined,
            imagePreviewUrl: undefined,
        }))
    }

    const handleClearTimestamp = () => {
        setTempCover((prev) => ({ ...prev, timestamp: undefined }))
    }

    return {
        videoRef,
        canvasRef,
        currentTime,
        duration,
        coverImage,
        tempCover,
        setTempCover,
        handleLoadedMetadata,
        handleScrub,
        handleSetCover,
        handleConfirmCover,
        handleTimestampChange,
        handleImageSelect,
        handleClearImage,
        handleClearTimestamp,
    }
}

export default useSelectVideoCover
