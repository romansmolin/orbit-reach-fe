const minRatio = 4 / 5
const maxRatio = 1.91
const tolerance = 0.01

type FileWithPreview = { file: File; previewUrl: string }

async function autoFixAspect(file: File, targetRatio: number): Promise<FileWithPreview> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const url = URL.createObjectURL(file)

        img.onload = () => {
            const { width, height } = img
            const originalRatio = width / height

            let sx = 0,
                sy = 0,
                sw = width,
                sh = height
            // too wide → crop width
            if (originalRatio > targetRatio) {
                sw = height * targetRatio
                sx = (width - sw) / 2
            }
            // too tall → crop height
            else if (originalRatio < targetRatio) {
                sh = width / targetRatio
                sy = (height - sh) / 2
            }
            // else already exact

            // draw cropped area into canvas of exact target ratio
            const canvas = document.createElement('canvas')
            canvas.width = sw
            canvas.height = sh
            const ctx = canvas.getContext('2d')!
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh)

            canvas.toBlob((blob) => {
                if (!blob) return reject(new Error('Canvas export failed'))
                // preserve original type & name
                const fixedFile = new File([blob], file.name, { type: file.type })
                const previewUrl = URL.createObjectURL(fixedFile)
                URL.revokeObjectURL(url)
                resolve({ file: fixedFile, previewUrl })
            }, file.type)
        }

        img.onerror = () => {
            URL.revokeObjectURL(url)
            reject(new Error('Image load failed'))
        }

        img.src = url
    })
}

export { autoFixAspect,maxRatio, minRatio, tolerance }
