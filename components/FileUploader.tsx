'use client'

import React, { useCallback, useState, MouseEvent } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import { cn, convertFileToUrl, getFileType } from '@/lib/utils'
import upload from '@/public/assets/icons/upload.svg'
import Image from 'next/image'
import Thumbnail from './Thumbnail'
import loader from '@/public/assets/icons/file-loader.gif'
import remove from '@/public/assets/icons/remove.svg'
import { uploadFile } from '@/lib/actions/file.actions'
import { MAX_FILE_SIZE } from '@/constants'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'

interface Props {
    ownerId: string
    accountId: string
    className?: string
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
    const [file, setFiles] = useState<File[]>([])
    const path = usePathname()

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            setFiles(acceptedFiles)

            const uploadPromises = acceptedFiles.map(async (file) => {
                if (file.size > MAX_FILE_SIZE) {
                    setFiles((prevFiles) =>
                        prevFiles.filter((f) => f.name !== file.name)
                    )
                    return toast.error('Error', {
                        description: (
                            <p className="body-2 text-white">
                                <span className="font-semibold">
                                    {file.name}
                                </span>{' '}
                                exceeds the maximum file size of 50MB.
                            </p>
                        ),
                        className: 'error-toast',
                        duration: 5000,
                    })
                }
                return uploadFile({ file, ownerId, accountId, path }).then(
                    (uploadedFile) => {
                        if (uploadedFile) {
                            setFiles((prevFiles) =>
                                prevFiles.filter((f) => f.name !== file.name)
                            )
                        }
                    }
                )
            })
            await Promise.all(uploadPromises)
        },
        [ownerId, accountId, path]
    )
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    })

    const handleRemoveFile = (
        e: MouseEvent<HTMLImageElement>,
        fileName: string
    ) => {
        e.stopPropagation()
        setFiles((prevFiles) =>
            prevFiles.filter((file) => file.name !== fileName)
        )
    }

    return (
        <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <Button type="button" className={cn('uploader-button', className)}>
                <Image
                    src={upload}
                    alt="Upload"
                    width={24}
                    height={24}
                    className=""
                />
                <p>Upload</p>
            </Button>
            {file.length > 0 && (
                <ul className="uploader-preview-list">
                    <h4 className="h-4 text-dark">Uploading</h4>
                    {file.map((file, index) => {
                        const { type, extension } = getFileType(file.name)
                        return (
                            <li
                                key={`${file.name}-${index}`}
                                className="uploader-preview-item"
                            >
                                <div className="flex items-center gap-3">
                                    <Thumbnail
                                        type={type}
                                        extension={extension}
                                        url={convertFileToUrl(file)}
                                    />

                                    <div className="">
                                        {file.name}
                                        <Image
                                            src={loader}
                                            alt="Loader"
                                            width={80}
                                            height={26}
                                        />
                                    </div>
                                </div>

                                <Image
                                    src={remove}
                                    alt="Remove"
                                    width={24}
                                    height={24}
                                    onClick={(e) =>
                                        handleRemoveFile(e, file.name)
                                    }
                                />
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default FileUploader
